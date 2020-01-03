import { trigger, transition, style, query, animateChild, group, animate } from '@angular/animations';

/** For page transitions, the commonly used and altered query for default styling */
const generalBothQuery = query(':enter, :leave', [style({ position: 'fixed', top: '*', left: 0, width: '100%' })]);
/** For page transitions, returns the commonly used animation with ease as we do not use many style opts */
const pageSlideTimings = (left: string | 0) => animate('500ms ease-in-out', style({ left }));

/** The animation for changing the current page */
export const slideInAnimation = trigger('routeAnimations', [
	transition('Home => *, Portfolio => Contact', [
		style({ position: 'fixed' }),
		generalBothQuery,
		query(':enter', [style({ left: '100%' })]),
		query(':leave', animateChild()),
		group([
			query(':leave', [pageSlideTimings('-100%')]),
			query(':enter', [pageSlideTimings(0)])
		]),
		query(':enter', animateChild()),
	]),
	transition('Portfolio => Home, Contact => *', [
		style({ position: 'fixed' }),
		generalBothQuery,
		query(':enter', [style({ left: '-100%' })]),
		group([
			query(':leave', [pageSlideTimings('100%')]),
			query(':enter', [pageSlideTimings(0)])
		]),
		query(':enter', animateChild({delay: 500})),
	])
])
