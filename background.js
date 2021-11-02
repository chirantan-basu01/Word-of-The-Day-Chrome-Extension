function getRandomNumber(number) {
	var max = number + 1;
	return Math.floor(Math.random() * Math.floor(max));
}

//Listen for messages
chrome.runtime.onMessage.addListener((msg, sender, response) => {
	if (msg.name == "fetchWords") {
		const apiKey = "rnncta0w0n0irsahii4djswvab7gr6r50ijp8qbcv39g0nhcx";
		const dateStr = new Date().toISOString().slice(0, 10); //24-08-2021
		const apiCall =
			"https://api.wordnik.com/v4/words.json/wordOfTheDay?date=" +
			dateStr +
			"&api_key=" +
			apiKey;
		console.log(apiCall);
		//We call API...
		fetch(apiCall)
			.then(function (res) {
				//Wait for response
				if (res.status != 200) {
					response({
						word: "Error",
						desc: "There was a problem loading the word of the day",
					});
					return;
				}
				res.json().then(function (data) {
					//Send the response
					response({ word: data.word, desc: data.note });
				});
			})
			.catch(function (err) {
				response({
					word: "Error",
					desc: "There was a problem loading the word of the day",
				});
			});
	}
	return true;
});
