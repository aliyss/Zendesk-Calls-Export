const axios = require('axios');
const fs = require('fs');
const request = require('request');

const ZendeskSell = axios.create({
	verify: true,
	headers: {
		"Content-Type": "application/json",
		"Authorization": "Bearer [API-KEY]"
	},
	baseURL: "https://api.getbase.com"
});

let max = 400;
let wait_time = 60000;

const delay = ms => new Promise(res => setTimeout(res, ms));

(async function fire() {
	for (let x = 1; x <= max; x++) {
		if (x % 20 === 0 || x === 1) {
			await delay(wait_time);
		}
		ZendeskSell.get(`/v2/calls?page=${x}`)
			.then(function (response) {
				let recording_items = 0;
				for (let i = 0; i < response['data']['items'].length; i++) {
					if (response['data']['items'][i]['data']['recording_url'] !== null) {
						let str = response['data']['items'][i]['data']['recording_url'];
						let n = str.lastIndexOf('/');
						let result = str.substring(n + 1);
						request
							.get(response['data']['items'][i]['data']['recording_url'] + ".mp3")
							.on('error', function(err) {
								console.log(err)
							})
							.pipe(fs.createWriteStream(`./output/mp3/${result}.mp3`));
						recording_items++;
					}
				}
				fs.writeFile(`./output/page-${x}.json`, JSON.stringify(response['data'], null, 4), (err) => {
					if (err) {
						throw err;
					} else {
						console.log(`Page ${x} downloaded with ${recording_items} recordings.`)
					}
				});
			})
			.catch(function (error) {
				// handle error
				if (error['response']['status'] === 429) {
					console.log(`Error 429: You are downloading the pages too fast. Page ${x} was not completely downloaded.`)
				} else {
					console.log(error)
				}
			})
			.finally(function () {

			});
	}
}());
