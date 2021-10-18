"use strict";

function tor_redirect(event) {
	if (event.type == "main_frame") {
		const url = new URL(event.url);
		const hostname = url.hostname;
		const tld = hostname.split('.').pop();
		if (tld != "onion") {
			var onion_header = event.responseHeaders.find(function (header) {
				return header['name'].toLowerCase() == 'onion-location';
			});
	
			if (typeof onion_header !== 'undefined') {
				const url2 = new URL(onion_header.value);
				const protocol2 = url2.protocol;
				const hostname2 = url2.hostname;
				const tld2 = hostname2.split('.').pop();
				if ((tld2 == "onion") && ((protocol2 == "http:") || (protocol2 == "https:"))) {
					return {
						redirectUrl: onion_header.value
					};
				}
			}
		}
	}
}


browser.webRequest.onHeadersReceived.addListener(
	tor_redirect,
	{ urls: ['<all_urls>'] },
	['blocking', 'responseHeaders']
);
