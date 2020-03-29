
const express = require('express');
const { scrape } = require('./scraper');

const serve = ({ port }) => {
	const app = express();
	app.use(express.json());
	app.get('*', async (_, res) => {
		let data = await scrape();
		if (data.error) {
			res.status(500).json(data.error);
		}
		res.status(200).json({ data })
	});

	return new Promise((resolve, reject) => {
		const _server = app.listen(port, err => {
			if (err) {
				reject(err);
				return;
			}
			console.log(`Crawl server listening on port ${port}.`);
			resolve(_server);
		});
	});
}

module.exports = serve;
