import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../styles/App.css';
import { makeRandomTweet, fillDataStore } from '../util/MarkovGenerator';
import TweetList from './TweetList';
import Search from './Search';
import { searchTwitter } from '../util/Services';

class App extends Component {
	constructor ({ defaultTweets, defaultUser }) {
		super({ defaultTweets, defaultUser });
		this.state = {
			tweets: defaultTweets,
			currentUser: defaultUser
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this._generateTweet = this._generateTweet.bind(this);
	}

	handleSubmit(event, user) {
		event.preventDefault();
		if (!user) {			
			return;
		}		
		searchTwitter(user) 
			.then((response) => {
				this.setState({
					tweets: response.data,
					currentUser: user
				}, () => {
					document.getElementById('myInput').value = ''; // todo don't manipulate dom directly
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
				<Search 
					ref={(el) => { this.searchInput = el }}
					handleSubmit={ this.handleSubmit }/>
				<button 
					type="button" 
					onClick={ this._generateTweet }
				>
					Generate new tweet!
				</button>
				<h4>{this.state.currentUser}'s tweets</h4>
				<TweetList tweets={ this.state.tweets }/>
      </div>
    );
  }
}

App.propTypes = {
	defaultTweets: PropTypes.arrayOf(PropTypes.string)
};

export default App;
