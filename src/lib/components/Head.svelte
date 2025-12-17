<script>
	import { config } from '$lib/config';
	// you can optionally import a share image here for the entire site?
	import socialImage from '$lib/assets/images/socialImage.png';

	// export let rtl = false;
	// let titleFromUrl = url.split('/').pop().replace('-', ' ');

	/**
	 * @typedef {Object} Props
	 * @property {string} [title]
	 * @property {any} [description]
	 * @property {any} [author]
	 * @property {any} [url]
	 * @property {any} [domain]
	 * @property {any} [img] - The featured image URL for the post, falls back to default social image
	 */

	/** @type {Props} */
	let {
		title = 'Pete McPherson',
		description = config.description,
		author = config.author,
		url = config.siteUrl,
		domain = config.domain,
		img = socialImage
	} = $props();

	// Use the provided image URL or fall back to the default social image
	const ogImage = img || socialImage;
</script>

<svelte:head>
	<title>{title} | {config.title}</title>
	<meta name="description" content={description} />
	<meta name="author" content={author} />

	<!-- Facebook Meta Tags -->
	<meta property="og:url" content={url} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={ogImage} />

	<!-- Twitter Meta Tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:domain" content={domain} />
	<meta property="twitter:url" content={url} />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={ogImage} />

	<!-- test LG timers -->
	<!-- List Gadget Evergreen Timer Tracking -->
	<!--
  Purpose: Captures subscriber email from email links and saves to cookie
  Security: This is a legitimate countdown timer tracking script from list-gadget.com
  Privacy: Stores subscriber emails for personalized timer tracking
-->
	<script>
		(function () {
			'use strict';

			// Get URL parameters first (used throughout script)
			var params = new URLSearchParams(window.location.search);

			// Configuration - Enable debug mode via ?debug=1 URL parameter
			var DEBUG = params.get('debug') === '1';

			// Helper: Safe logging (only when DEBUG is enabled)
			function log(msg, data) {
				if (DEBUG && console && console.log) {
					console.log('[ListGadget] ' + msg, data !== undefined ? data : '');
				}
			}

			// Initialize global namespace for timer configurations
			window.ListGadgetTimers = window.ListGadgetTimers || {};

			// Timer configuration (escaped values prevent XSS)
			var config = {
				timerId: 'irJmV9P76atu',
				userId: 'QPbkLXgoRQbGCwnXEZBHvPkPHFS2',
				apiDomain: 'http://localhost:5173',
				gifDomain: 'http://localhost:5173',
				cookieName: 'lg_timer_irJmV9P76atu',
				storageKey: 'lg_timer_irJmV9P76atu'
			};

			log('Tracking script initialized for timer', config.timerId);

			// Cookie utilities
			function setCookie(name, value, days) {
				var expires = new Date(Date.now() + days * 864e5).toUTCString();
				document.cookie =
					name +
					'=' +
					encodeURIComponent(value) +
					'; expires=' +
					expires +
					'; path=/; SameSite=Lax';
			}

			function getCookie(name) {
				var cookies = document.cookie.split('; ');
				for (var i = 0; i < cookies.length; i++) {
					var parts = cookies[i].split('=');
					if (parts[0] === name) return decodeURIComponent(parts[1]);
				}
				return '';
			}

			function deleteCookie(name) {
				document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax';
			}

			// UUID generator for anonymous tracking
			function generateUUID() {
				return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
					var r = (Math.random() * 16) | 0;
					var v = c === 'x' ? r : (r & 0x3) | 0x8;
					return v.toString(16);
				});
			}

			// Parse URL parameters for subscriber tracking (email only)
			var urlEmail = params.get('email');
			var clearRequest = params.get('clear_lg_timer');

			// Validate that merge tag was replaced (detect common unreplaced patterns)
			// Check for literal merge tag syntax (these should have been replaced by email provider)
			if (urlEmail) {
				var isUnreplaced =
					// Mailchimp style: *|EMAIL|*
					urlEmail.indexOf('*|') === 0 ||
					// Kit/ConvertKit style: {{ subscriber.email }}
					urlEmail.indexOf('{{') === 0 ||
					// MailerLite style: {$email} or [email]
					(urlEmail.indexOf('{$') === 0 && urlEmail.indexOf('}') > 0) ||
					(urlEmail.indexOf('[') === 0 && urlEmail.indexOf(']') === urlEmail.length - 1) ||
					// Generic style: %EMAIL%
					(urlEmail.indexOf('%') === 0 && urlEmail.lastIndexOf('%') === urlEmail.length - 1);

				if (isUnreplaced) {
					console.error(
						'[ListGadget] ⚠️ Merge tag was not replaced! Received literal: ' + urlEmail
					);
					console.error('[ListGadget] Please check your email integration configuration.');
					urlEmail = null;
				}
			}

			// Normalize email (should be lowercase for consistency with backend)
			var email = urlEmail ? urlEmail.toLowerCase().trim() : null;

			// Storage retrieval with error handling
			var cookieEmail = getCookie(config.cookieName);
			var anonCookieName = 'lg_anon_' + config.timerId;
			var anonCookie = getCookie(anonCookieName);
			var storageEmail = '';
			try {
				storageEmail = localStorage.getItem(config.storageKey) || '';
			} catch (e) {
				log('localStorage unavailable');
			}

			log('URL email', email);
			log('Cookie email', cookieEmail);
			log('Anon cookie', anonCookie);
			log('Storage email', storageEmail);

			// FEATURE: Test Reset - Clear subscriber data for testing
			if (clearRequest === config.timerId) {
				log('Clear request detected');

				var currentEmail = cookieEmail || email || storageEmail;

				// Set flag to show explanation UI (display code will handle the UI)
				window.ListGadgetTimers[config.timerId] = {
					clearing: true,
					pendingClear: true,
					currentEmail: currentEmail,
					userId: config.userId,
					timerId: config.timerId,
					apiDomain: config.apiDomain,
					cookieName: config.cookieName,
					storageKey: config.storageKey
				};

				log('Clear mode activated - waiting for user confirmation');
				return;
			}

			// MIGRATION CHECK: If anon cookie exists but URL has real email, trigger migration
			var migrateFrom = null;
			if (anonCookie && email && email.indexOf('anon_') !== 0) {
				log('🔄 MIGRATION DETECTED: anon cookie exists + real email in URL');
				log('  Migrating from:', anonCookie);
				log('  Migrating to:', email);
				migrateFrom = anonCookie;
			}

			// Get subscriber email (priority: Cookie > URL > localStorage > Anonymous)
			var finalEmail = cookieEmail || email || storageEmail;

			// NEW: If still no email, check for or generate anonymous ID
			if (!finalEmail) {
				if (anonCookie) {
					log('Using existing anonymous ID', anonCookie);
					finalEmail = anonCookie;
				} else {
					var anonId = 'anon_' + generateUUID();
					setCookie(anonCookieName, anonId, 30);
					log('✨ Generated NEW anonymous ID', anonId);
					finalEmail = anonId;
				}
			}

			// Override finalEmail if migration detected
			if (migrateFrom) {
				finalEmail = email; // Use real email going forward
			}

			if (finalEmail) {
				log('Subscriber identifier found', finalEmail);

				// Persist for 30 days (only if not anonymous)
				if (finalEmail.indexOf('anon_') !== 0) {
					setCookie(config.cookieName, finalEmail, 30);
					try {
						localStorage.setItem(config.storageKey, finalEmail);
					} catch (e) {
						log('Could not save to localStorage');
					}
				}

				// Store config for display scripts
				window.ListGadgetTimers[config.timerId] = {
					userId: config.userId,
					timerId: config.timerId,
					email: finalEmail,
					migrateFrom: migrateFrom, // NEW - for migration
					apiDomain: config.apiDomain,
					gifDomain: config.gifDomain
				};

				log('Tracking complete - config stored');
			} else {
				log('No subscriber identifier found');
				window.ListGadgetTimers[config.timerId] = null;
			}
		})();
	</script>
	<!-- End List Gadget Timer -->
</svelte:head>
