/** Controls the uri navigation */
import { Router, Request, Response } from 'express';
/** Package for sending emails */
import { createTransport, Transporter } from 'nodemailer';
/** Validators for post requests */
import { body, validationResult } from 'express-validator';
/** Contains functions which generate email html */
import { generateInquiryPost } from './email-templates';

/** Custom Transport class for sending emails through nodemailer */
class MailTransport {
	/** The nodemailer transport to send the emails */
	private _transport: Transporter;
	/** Defaults for sending all emails on this site */
	private _defaultConfig = {
		from: `"Jake Johnson" <${process.env.FROM_EMAIL}>`,
		to: process.env.TO_EMAIL!,
		attachments: [{
			filename: 'jakejohnson-logo.png',
			contentDisposition: 'inline',
			// TODO: Get actual logo and use path relative to this file
			path: 'https://www.1080sweep.com/assets/images/logo.png',
			cid: `jakelogo`
		}]
	}

	constructor() {
		this._transport = createTransport({
			service: process.env.EMAIL_SERVICE,
			auth: { user: process.env.FROM_EMAIL, pass: process.env.FROM_EMAIL_PASSWORD }
		});
	}

	/** Build and submit the request to send an email */
	sendMail = (subject: string, html: string): Promise<any> => this._transport.sendMail(Object.assign({}, this._defaultConfig, { subject, html }));
}

/**
 * This is the email router. It handles the requests for routes email/*
 * On this small app, it just makes the send email contact request
 * 
 * uri's are relative to `email/*` so `email/inquiry` looks like `/inquiry` here
 */
export const emailRouter = (): Router & { emailTransporter: MailTransport } => {
	const emailTransporter = new MailTransport();
	const router = Router();

	/**
	 * Sends a contact email from a user to us here at codexist
	 * 
	 * 200 - success
	 * 420 - rate limit for sending emails exceeded
	 * 422 - invalid params
	 * 500 - server error 
	 * 
	 * @param {string}  req.body.name
	 * @param {string}  req.body.email
	 * @param {string}  req.body.message
	 * @param {string}	[req.body.website]
	 */
	router.post('/inquiry', [
		body('name').trim()
			.exists({ checkFalsy: true }).withMessage('Required')
			.isLength({ max: 80 }).withMessage('maxlength'),
		body('message').trim()
			.exists({ checkFalsy: true }).withMessage('Required')
			.isLength({ max: 500 }).withMessage('maxlength'),
		body('email').trim()
			.exists({ checkFalsy: true }).withMessage('Required')
			.customSanitizer(email => email.toLowerCase())
			// .isEmail().withMessage('email')
			.isLength({ max: 320 }).withMessage('maxlength'),
		body('website').trim()
	], (req: Request, res: Response) => {
		// Check if the client has reached their max already
		try {
			if ((req.session!.emailsSent || 0) >= 2) return res.status(420).json('Email rate limit exceeded');
		} catch (_) { }

		// Check for errors from the express-validator chain
		const errors = validationResult(req);
		if (!errors.isEmpty()) return res.status(422).json(errors.array());

		// Get the desired parameters from the request for the email template
		const { name, message, email, website } = req.body;

		// Send the email
		return emailTransporter.sendMail('Contact from your website', generateInquiryPost({ name, message, email, website })).then(() => {
			try {
				if (!req.session!.emailsSent) req.session!.emailsSent = 1;
				else req.session!.emailsSent++;
			} catch (_) { return res.status(200).json({ success: true, emailsSent: 1 }) }
			return res.status(200).json({ success: true, emailsSent: req.session!.emailsSent });
		}).catch(() => res.status(501).json('Inquiry submission unsuccessful'))
	});

	/**
 	 * Check if the current client has an active session and `recently`
 	 * sent an email.
 	 * 
 	 * `Recently` is defined as the session being active. This length is determined
 	 * in /app.js
 	 */
	router.get('/quota', (req, res) => {
		try {
			res.status(200).json(req.session!.emailsSent || 0)
		} catch (_) { res.status(200).json(0) }
	});

	return Object.assign(router, { emailTransporter });
}
