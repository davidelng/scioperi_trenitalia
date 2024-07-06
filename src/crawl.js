import { logger } from './logger.js';
import { JSDOM } from 'jsdom';

async function findStrikes(baseURL) {
	logger.info(`Searching for strikes on: ${baseURL}`);
	let htmlBody = null;
	try {
		htmlBody = await fetchHTML(baseURL)
        let news = getNewsFromHTML(htmlBody);
        if (news.length < 1) {
            logger.error('No news found');
            return [];
        }
		return news.filter(n => n.toLowerCase().includes('sciopero'));
	} catch (err) {
		logger.error(err.message);
	}
}

async function fetchHTML(url) {
	let res = null;
	try {
		res = await fetch(url);
		if (res.status >= 400) {
			throw new Error(`Got HTTP error on ${url}, code: ${res.status}`);
		}
		let contentType = res.headers.get('content-type');
		if (!contentType || !contentType.includes('text/html')) {
			throw new Error(`Non HTML response, content-type ${contentType}, on page ${url}`);
		}
		return res.text();
	} catch (err) {
		logger.error(`Error in fetch: ${err.message}, on page: ${url}`);
	}
}

function getNewsFromHTML(htmlBody) {
	let news = [];
	let dom = new JSDOM(htmlBody);
	let anchors = dom.window.document.querySelectorAll('a');
	for (let anchor of anchors) {
		if (anchor.classList.contains('headingNewsAccordion')) {
			news.push(anchor.textContent.trim());
		}
	}
	return news
}

export { findStrikes };
