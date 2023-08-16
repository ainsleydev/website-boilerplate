/**
 * Cookie consent banner.
 *
 * Example Usage:
 * const cookie = new Cookie({
 * 		banner: document.querySelector(".cookie"),
 * 		cookieName: "reddico-consent",
 * 		expiry: 365,
 * 		acceptButton: document.querySelector("#cookie-allow"),
 * 		declineButton: document.querySelector("#cookie-decline"),
 * }).init()
 */

export default class Cookie {
	private settings: { domain: string; name: any; decline: any; banner: any; expiry: any; accept: any };

	constructor(settings) {
		this.settings = {
			banner: settings.banner,
			name: settings.cookieName || 'cookie-consent',
			expiry: settings.expiry || 365,
			accept: settings.acceptButton,
			decline: settings.declineButton,
			domain: settings.domain || document.location.host,
		};
	}

	init() {
		if (this._read(this.settings.name)) {
			return;
		}

		this._show();

		this.settings.accept.addEventListener('click', () => {
			this._create(this.settings.name, true, this.settings.expiry, this.settings.domain);
			this._hide();
		});

		this.settings.decline.addEventListener('click', () => {
			this._create(this.settings.name, false, this.settings.expiry, this.settings.domain);
			this._hide();
		});

		return this;
	}

	_show() {
		this.settings.banner.classList.remove('cookie-hidden');
	}

	_hide() {
		this.settings.banner.classList.add('cookie-hidden');
	}

	_get() {
		const pairs = document.cookie.split(';'),
			cookies = {};
		for (let i = 0; i < pairs.length; i++) {
			const pair = pairs[i].split('=');
			cookies[(pair[0] + '').trim()] = unescape(pair.slice(1).join('='));
		}
		return cookies;
	}

	_create(name, value, days, domain) {
		let expires;

		if (days) {
			const date = new Date();
			date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
			expires = `; expires=${date.toUTCString()}`;
		} else {
			expires = '';
		}

		if (this.settings.domain) {
			document.cookie = `${name}=${value}${expires}; path=/; SameSite=None Secure`;
			return;
		}
	}

	_delete(name, path, domain) {
		if (this._read(name)) {
			document.cookie = name + '=' + (path ? ';path=' + path : '') + (domain ? ';domain=' + domain : '') + ';expires=Thu, 01 Jan 1970 00:00:01 GMT';
		}
	}

	_read(name) {
		const nameQuery = `${name}=`;
		const cookies = document.cookie.split(';');
		for (let i = 0; i < cookies.length; i += 1) {
			let cookie = cookies[i];

			while (cookie.charAt(0) === ' ') {
				cookie = cookie.substring(1, cookie.length);
			}

			if (cookie.indexOf(nameQuery) === 0) {
				return cookie.substring(nameQuery.length, cookie.length);
			}
		}
		return false;
	}
}
