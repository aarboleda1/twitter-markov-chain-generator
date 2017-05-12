# Markov Chain Generator 

## Prerequisites
- You will need Node.js version >= 6.0

## Installation
1. Open new terminal window
2. `$git clone https://github.com/aarboleda1/twitter-markov-chain-generator.git` - clone repo
3. `$cd ./twitter-markov-chain-generator`
4. `$npm install`
5. `$npm run server` - start server
6. `$npm start` - start react client

## Stack 
- React
- Express

## My Markov Chain Implementation
I used a Markov Chain to model the statistical likelihood of a word in a tweet being followed by some other word in a tweet. Then, I used that statistical information to generate new tweets by choosing the first word (randomly) and then choosing subsequent words with a frequency proportional to how those words are arranged in the original text. This generates a string that may not be in the original text, but shares similar stylistic properties to other tweets.

1. Construct a list of words unique in a set of tweets by a given user
2. For each word in the list, count words that follow that word and with what frequency. (i.e. if the user timeline came in an array `['I like twitter', 'I loooove instagram', I love Facebook']` ) 
3. Starting with 'I', would model to a 33% chance of choosing either 'like', 'loooove', or 'love' 
4. By simulating a random die roll via `Math.Random()` I can randomly choose the next word and append it to the current tweet being generated.


## Todo
- [x] Authenticate into Twitter
- [x] Generate chain must be generated based on the tweets of any Twitter user. 
- [x] Search any twitter user and generate a markov chain based on the users tweets
- [x] Refactor components and folder structure and break out into separate components
- [x] Code cleanup, syntax, documentation
- [ ] Add Bootstrap or CSS styling
## License
The content of this repository is licensed under a MIT license.
[LICENSE](/LICENSE) file.


