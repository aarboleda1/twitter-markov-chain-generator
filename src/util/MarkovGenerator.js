/*
I initialized 3 data structures
terminals - stores the list of words as properties

The wordstats object acts as a database. For each tweet, I keep track of each word that appear
at the start and end of tweets

Then, for each word in each title, the code simply initializes or adds to the list of words following a given word, 
which is stored by key in the wordstats object
*/
let terminals = {};
let startwords = [];
let wordstats = {}; // database to keep probability of next word 

export const fillDataStore = (tweets) => {
	/*
		anytime a new user is searched, we have new items to deal with
		and need to create a new, empty store 
	*/
	terminals = {};	
	startwords = [];
	wordstats = {};

	for (let i = 0; i < tweets.length; i++) {
		let words = tweets[i].split(' ');
		words = words.filter((word) => {
			return !word.includes('@')
		})
		terminals[words[words.length-1]] = true;
		startwords.push(words[0]);
		for (var j = 0; j < words.length - 1; j++) {
				if (wordstats.hasOwnProperty(words[j])) {
						wordstats[words[j]].push(words[j+1]); //todo return null
				} else {
						wordstats[words[j]] = [words[j+1]];
				}
		}
	}	
};


const choice = (a) => {
	let i = Math.floor(a.length * Math.random());
	return a[i];
};

export const makeRandomTweet = (minLength) => {
	let word = choice(startwords); //wordstats keys

	let newTweet = [word];
	while (wordstats.hasOwnProperty(word)) {
			var next_words = wordstats[word];
			word = choice(next_words);
			newTweet.push(word);
			if (newTweet.length > minLength && terminals.hasOwnProperty(word)) break;
	}
	if (newTweet.length < minLength) {
		return makeRandomTweet(minLength);
	};
	return newTweet.join(' ');
};

const defaultTweets = 
[ 'Test',
  'Giving @getexponent a run this afternoon. Maybe #mobile isn\'t dead after all',
  'New blog post about REST and RESTful APIS https://t.co/CjPXzhuB8E',
  'story of my life @Mike_Mitrakos https://t.co/L8TCuXCjbu',
  'I just downloaded The JWT Handbook 📖 by @auth0. Everything you wanted to know about JWTs in one place. Check it out! https:t.co/ST0WrCqlhC',
  'Spent the weekend building out #MomComm at @AngelHack with @viv_viv_vivian. @HackReactor  starts next week',
  'could be so similar @_ericelliott',
  'Great article @_ericelliott \'Are Programmers Brains Different?\' I was a pro golfer b4 coming to SF as a programmer. never realized the 2' 
];
fillDataStore(defaultTweets); 
