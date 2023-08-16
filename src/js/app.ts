/**
 * app.ts
 *
 * Responsible for bootstrapping the application including
 * importing any styles & components.
 *
 * @author ainsley.dev LTD
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 */

import Cookie from './components/cookie';

/**
 * Variables
 */
const html = <HTMLHtmlElement>document.querySelector('html');

/*
 * Remove No JS Body Class
 *
 */
html.classList.remove('no-js');
html.classList.add('js');

/**
 * Remove JS Hide classes
 * These classes are hidden by default when no
 * JS detected.
 */
window.addEventListener('load', () => {
	document.querySelectorAll('.js-hide').forEach((el) => el.classList.remove('js-hide'));
});

/**
 * Cookie Consent
 */
new Cookie({
	banner: document.querySelector('.cookie'),
	cookieName: 'adev-consent',
	expiry: 365,
	acceptButton: document.querySelector('#cookie-allow'),
	declineButton: document.querySelector('#cookie-decline'),
}).init();
