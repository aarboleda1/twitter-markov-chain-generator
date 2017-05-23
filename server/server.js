const express = require('express');
let app = express();
const cors = require('cors');
app.use(cors());
app.options('*', cors());

const request = require('request');
const secrets = require('./config');
const Twitter = require('twitter');

const fetchUserData = (username) => {
	const client = new Twitter({
		consumer_key: secrets.consumer_key,
		consumer_secret: secrets.consumer_secret,
		bearer_token: secrets.bearer_token
	});	
	let allTweets = [];
	var getUrl = `https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=${username}&count=200&include_rts=false`
	const userData = new Promise((resolve, reject) => {
		client.get(getUrl, function(error, tweets, response){
			// if(error) console.log(util.inspect(error, false, null));;
			if (error) {
				reject(error);
			} else {
				const tweetTexts = tweets.map((tweet) => {
					return tweet.text;
				});
				allTweets = allTweets.concat(tweetTexts);
				const lastTweet = tweets[tweets.length - 1];
				if (!lastTweet) {
					reject(new Error('No more tweets'));
				} else {
					resolve(lastTweet.id);
				}
			}
		})	
	})
	.then((id) => {
		return new Promise((resolve, reject) => {
			client.get(getUrl, {count: 200, max_id: id}, (error, tweets, response) => {
				const tweetTexts = tweets.map((tweet) => {
					return tweet.text;
				});
				allTweets = allTweets.concat(tweetTexts);			
				resolve(allTweets);
			})
		})
	})	
	return userData;
}


app.get('/user/:username', function (req, res) {
	const username = req.params.username;
	fetchUserData(username).then((tweets) => {
		res.send(tweets);
	})
	.catch((err) => {
		console.error(err);
	})
})

app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
})