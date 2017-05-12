# Markov Chain Generator 

## Prerequisites
- You will need Node.js version >= 6.0

## Installation
1. Open new terminal window
2. `$git clone https://github.com/aarboleda1/twitter-markov-chain-generator.git` - clone repo
3. `$cd ./twitter-markov-chain-generator`
4. `$npm install`
5. `$npm run server` - Should spin up an express server on port 8080
6. Open a new terminal window
6. n`pm start` in the new terminal window to start the React client
7. Point your browser to http://localhost:3000/ to see the application!

**Note** Make sure to run the server and client in orer for the application to run correctly

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
- [ ] Testing 

## Potential Improvements
### Architecture
I currently make the fetch to the twitter API server side. Why? CORS issues when trying to fetch from client side. It was the quickest iteration to get a prototype up and running.

**Pros** - In the case that I want to create a Markov Chain for a user that is frequented often, I wouldn’t have to constantly make requests to the Twitter API
i.e. Donald Trump - if 10,000 people wanted to see generate new tweets on his behalf - I could create one model server side, cache it and then serve it to the client

**Cons** - Does this application **need** to store data right now? Probably not. In this case, it could be seen as additional overhead.  

## License
The content of this repository is licensed under a MIT license.
[LICENSE](/LICENSE) file.


