import React, { Component } from 'react';
import './App.css';
import { makeRandomTweet, fillDataStore } from './MarkovGenerator';
import TweetList from './components/TweetList';
import Search from './components/Search';
import { searchTwitter } from './util/Services';

class App extends Component {
	constructor (props) {
		super(props);
		this.state = {
			tweets: this.props.defaultTweets,
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
export default App;
