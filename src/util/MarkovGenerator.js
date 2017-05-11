const antons_tweets = [ 'Test',
  'Giving @getexponent a run this afternoon. Maybe #mobile isn\'t dead after all',
  'New blog post about REST and RESTful APIS https://t.co/CjPXzhuB8E',
  'story of my life @Mike_Mitrakos https://t.co/L8TCuXCjbu',
  'I just downloaded The JWT Handbook 📖 by @auth0. Everything you wanted to know about JWTs in one place. Check it out! https:t.co/ST0WrCqlhC',
  'Spent the weekend building out #MomComm at @AngelHack with @viv_viv_vivian. @HackReactor  starts next week',
  'could be so similar @_ericelliott',
  'Great article @_ericelliott \'Are Programmers Brains Different?\' I was a pro golfer b4 coming to SF as a programmer. never realized the 2' 
];

const terminals = {};
const startwords = [];
const wordstats = {}; // database to keep probability of next word 

export const fillDataStore = (tweets) => {
	for (let i = 0; i < tweets.length; i++) {
			let words = tweets[i].split(' ');
			terminals[words[words.length-1]] = true;
			startwords.push(words[0]);
			for (var j = 0; j < words.length - 1; j++) {
					if (wordstats.hasOwnProperty(words[j])) {
							wordstats[words[j]].push(words[j+1]);
					} else {
							wordstats[words[j]] = [words[j+1]];
					}
			}
	}	
};

fillDataStore(antons_tweets);


const choice = (a) => {
    var i = Math.floor(a.length * Math.random());
    return a[i];
};

export const makeRandomTweet = (min_length) => {
    let word = choice(startwords);
    let newTweet = [word];
    while (wordstats.hasOwnProperty(word)) {
        var next_words = wordstats[word];
        word = choice(next_words);
        newTweet.push(word);
        if (newTweet.length > min_length && terminals.hasOwnProperty(word)) break;
    }
    if (newTweet.length < min_length) return makeRandomTweet(min_length);
    return newTweet.join(' ');
};

