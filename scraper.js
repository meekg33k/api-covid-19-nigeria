const Parser = require("htmlparser2").Parser;
const fetch = require("isomorphic-fetch");
const {
	DATA_SRC_URL,
	STATES,
	STATE_SPREAD_DATA_HOOK_STR,
	TOTAL_COUNT_DATA_HOOK_STR
} = require('./constants');
const {
	getStateAndSpreadCount,
	getTotalCountByCategory
} = require('./utils');

var results = [];

const scrape = async () => {
	results = [];
	try {
		res = await fetch(DATA_SRC_URL);
		const markup = await res.text();
		await extractMarkupFromFetch(markup);
		return results;
	}
	catch (e) {
		console.log(e); //TODO: Implement better error logging
		return { 'error': 'Oops! Server error' };
	}
}

const extractMarkupFromFetch = (markup) => {
	return new Promise((resolve) => {
		let extractedData = {};

		const parser = new Parser({
			ontext(text) {
				//Parse and extract latest data about total count
				if (text.indexOf(TOTAL_COUNT_DATA_HOOK_STR) > -1) {
					try {
						const { countPerCategory, date, time } = parseMarkupForLatestTotalCountPerCategory(text);
						extractedData.date = date;
						extractedData.time = time;
						extractedData.countPerCategory = countPerCategory;
					}
					catch (e) {
						//TODO: Implement better error handling
						console.log('Oops! Error parsing latest count data', e);
					}
				}
				//Parse and extract latest data about state spread
				if (text.indexOf(STATE_SPREAD_DATA_HOOK_STR) > -1) {
					try {
						extractedData.spreadByState = parseMarkupForLatestSpreadByState(text);
						const anotherData = { ...extractedData }
						handleExtractedData(anotherData);
					}
					catch (e) {
						console.log('Oops! Error parsing latest spread ddata', e)
						extractedData.spreadByState = [];
						const anotherData = { ...extractedData }
						handleExtractedData(anotherData);
					}
				}
			},
			onend() {
				resolve();
			}

		}, { decodeEntities: true });


		parser.write(markup);
		parser.end();

	});
};

const parseMarkupForLatestTotalCountPerCategory = (text) => {
	let parsedData = {};

	try {
		const dateToken = text.match(new RegExp('\\d{1,}(nd|th|st|rd)\\s(March|April)', 'igm'));
		const timeToken = text.match(new RegExp('\\d{1,2}\\s*:\\s*\\d{2}\\s*(am|pm)', 'igm'));
		const countPerCategory = text.match(new RegExp('\\d{1,}\\s(confirmed|discharged|death)', 'igm'));

		parsedData = {
			date: dateToken && dateToken[0],
			time: timeToken[0],
			countPerCategory: getTotalCountByCategory(countPerCategory)
		}
	}
	catch (e) {
		console.error('Error occurred while parsing for latest total count', e)
	}

	return parsedData;
}


const parseMarkupForLatestSpreadByState = (text) => {
	let stateSpreadData = [];

	try {
		const stateMatcher = STATES.join('|');
		const stateCountDataMatch = text.match(new RegExp(`(${stateMatcher})\\s*-\\s*\\d{1,}`, 'igm'));
		stateSpreadData = getStateAndSpreadCount(stateCountDataMatch);
	}
	catch (e) {
		console.error('Error occurred while parsing for latest total count', e)
	}

	return stateSpreadData;
}


const handleExtractedData = (data) => {
	results.push(data);
}

module.exports = { scrape };