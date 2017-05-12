import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../styles/App.css';
import { makeRandomTweet, fillDataStore } from '../util/MarkovGenerator';
import TweetList from './TweetList';
import Search from './Search';
import { searchTwitter } from '../util/Services';

class App extends Component {
	constructor ({ defaultTweets }) {
		super({ defaultTweets });
		this.state = {
			tweets: defaultTweets,
		}
		this.fetchUser = this.fetchUser.bind(this);
		this._generateTweet = this._generateTweet.bind(this);
	}

	fetchUser(event, user) {
		event.preventDefault();
		
		searchTwitter(user) 
			.then((response) => {
				this.setState({
					tweets: response.data,
					user: ''
				}, () => {
					fillDataStore(this.state.tweets);
				}) 
			})
	}

	_generateTweet() {
		var tweet = makeRandomTweet(3 + Math.floor(3 * Math.random()));
		this.setState({
			tweets: [tweet].concat(this.state.tweets)
		})
	}

  render() {
    return (
      <div className="App">
        <h2>Markov Chain Generator</h2>
				<Search fetchUser={ this.fetchUser }/>
				<button type="button" onClick={ this._generateTweet }>Generate new tweet!!</button>
				<TweetList tweets={ this.state.tweets }/>
      </div>
    );
  }
}

App.propTypes = {
	defaultTweets: PropTypes.arrayOf(PropTypes.string)
};

export default App;
