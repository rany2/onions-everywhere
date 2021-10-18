"use strict";

const tld = window.location.origin.split(".").pop();
if (tld != "onion") {
	var metas = document.getElementsByTagName('meta');
	for (let i=0; i<metas.length; i++) {
		try {
			if (metas[i].getAttribute("http-equiv").toLowerCase() == "onion-location") {
				const url2 = new URL(metas[i].content);
				const protocol2 = url2.protocol;
				const hostname2 = url2.hostname;
				const tld2 = hostname2.split('.').pop();
				if ((tld2 == "onion") && ((protocol2 == "http:") || (protocol2 == "https:"))) {
					window.location.href = metas[i].content;
				}
			}
		} catch(e) {
			null;
		}
	}
}
