const express = require('express');
let app = express();
const cors = require('cors');
app.use(cors());
app.options('*', cors());

const Buffer = require('buffer/').Buffer;
const request = require('request');
const consumer_key = "3GdRJBNNOiZ5KBcShjaLqrd5H";
const consumer_secret = "xuCrad84g7x0RFKI7wARAtukHVaekMS1BVlQzhuQD8TznhHcrt";
const enc_secret = new Buffer(consumer_key + ':' + consumer_secret).toString('base64');
const Twitter = require('twitter');

var oauthOptions = {
	url: 'https://api.twitter.com/oauth2/token',
	headers: {'Authorization': 'Basic ' + enc_secret, 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
	body: 'grant_type=client_credentials'
};
var bearer = getBearer();

const fetchUserData = (username) => {
	const client = new Twitter({
		consumer_key: "3GdRJBNNOiZ5KBcShjaLqrd5H",
		consumer_secret: "xuCrad84g7x0RFKI7wARAtukHVaekMS1BVlQzhuQD8TznhHcrt",
		bearer_token: "AAAAAAAAAAAAAAAAAAAAAKBK0gAAAAAAzcemC72VxckAq9g%2FxZyCTgaPnyc%3DqEIcidZBznY8Y2YwJUOkYt88RaI8nWMrjbMQz3IafcmlMvH6zH"
	});	
	var getUrl = `https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=${username}&count=50&include_rts=false`
	const userData = new Promise((resolve, reject) => {
		client.get(getUrl, function(error, tweets, response){
			// if(error) console.log(util.inspect(error, false, null));;
			const tweetText = tweets.map((tweet) => {
				return tweet.text;
			});
			resolve(tweetText);
		})		
	});
	return userData;
}


function getBearer(){
    request.post(oauthOptions, function(e, r, body) {
      var bod = JSON.parse(body);
      bearer = bod.access_token;
      return bearer;
    });
}

app.get('/user/:username', function (req, res) {
	const username = req.params.username;
	fetchUserData(username).then((tweets) => {
		res.send(tweets);
	})
})

app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
})













