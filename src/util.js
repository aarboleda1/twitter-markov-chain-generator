var Buffer = require('buffer/').Buffer;
var request = require('request');
var consumer_key = "3GdRJBNNOiZ5KBcShjaLqrd5H";
var consumer_secret = "xuCrad84g7x0RFKI7wARAtukHVaekMS1BVlQzhuQD8TznhHcrt";
var enc_secret = new Buffer(consumer_key + ':' + consumer_secret).toString('base64');
var Twitter = require('twitter');

// const config = {
// 	"consumerKey": "3GdRJBNNOiZ5KBcShjaLqrd5H",
// 	"consumerSecret": "xuCrad84g7x0RFKI7wARAtukHVaekMS1BVlQzhuQD8TznhHcrt",
// 	"accessToken": "361587826-1f5UYGjkheR8usRf3M0SKFegFSak2fTcmIs7V3SN",
// 	"accessTokenSecret": "JSjIqKNszHROFmlZe2Xv7tvAfLbKosU5gKLzyMpJcxNbT",
// 	"callbackURL": "http://yourusername.com"
// }

var oauthOptions = {
	url: 'https://api.twitter.com/oauth2/token',
	headers: {'Authorization': 'Basic ' + enc_secret, 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
	body: 'grant_type=client_credentials'
};

var bearer = getBearer();

function getBearer(){
    request.post(oauthOptions, function(e, r, body) {
      var bod = JSON.parse(body);
      bearer = bod.access_token;
      return bearer;
    });
}

// const client = new Twitter({
// 	consumer_key: "3GdRJBNNOiZ5KBcShjaLqrd5H",
// 	consumer_secret: "xuCrad84g7x0RFKI7wARAtukHVaekMS1BVlQzhuQD8TznhHcrt",
// 	bearer_token: "AAAAAAAAAAAAAAAAAAAAAKBK0gAAAAAAzcemC72VxckAq9g%2FxZyCTgaPnyc%3DqEIcidZBznY8Y2YwJUOkYt88RaI8nWMrjbMQz3IafcmlMvH6zH"
// });

export const fetchUserData = (username) => {
	const client = new Twitter({
		consumer_key: "3GdRJBNNOiZ5KBcShjaLqrd5H",
		consumer_secret: "xuCrad84g7x0RFKI7wARAtukHVaekMS1BVlQzhuQD8TznhHcrt",
		bearer_token: "AAAAAAAAAAAAAAAAAAAAAKBK0gAAAAAAzcemC72VxckAq9g%2FxZyCTgaPnyc%3DqEIcidZBznY8Y2YwJUOkYt88RaI8nWMrjbMQz3IafcmlMvH6zH"
	});	
	var getUrl = `https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=antonarboleda&count=20&include_rts=false`
	const userData = new Promise((resolve, reject) => {
		client.get(getUrl, function(error, tweets, response){
			// if(error) console.log(util.inspect(error, false, null));;
			const tweetText = tweets.map((tweet) => {
				return tweet.text;
			});
			resolve(tweetText);
		})
		
	})
	return userData;

}



fetchUserData().then((res) => {
	console.log(res,' IS THE RESPONSE')
})


