/** Controls the uri navigation */
import { Router } from 'express';
// Get routers from other files to route traffic
import { emailRouter } from './email';

/**
 * This is the api router. It handles requests from the angular client to /api/*
 *
 * uri's are relative to /api/
 * so '/api/email' looks like '/email' here
 */
export const ApiServer = (): Router => {
	let router = Router();

	router.use('/email', emailRouter());

	return router;
}
