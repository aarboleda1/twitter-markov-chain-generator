import React, { Component } from 'react';
import './App.css';
import { makeRandomTweet, fillDataStore } from './MarkovGenerator';
import axios from 'axios';
import TweetList from './components/TweetList'

class App extends Component {
	constructor (props) {
		super(props);
		this.state = {
			tweets: this.props.defaultTweets,
			user: '',
		}
		this.fetchUser = this.fetchUser.bind(this);
		this._handleChange = this._handleChange.bind(this);
		this._generateTweet = this._generateTweet.bind(this);
	}
	_handleChange(e) {
		e.preventDefault();
		this.setState({
			user: e.target.value
		})
	}

  errorHandler(err) {
		console.error(err)
	}

	fetchUser(e) {
		e.preventDefault();
		axios.get(`http://localhost:8080/user/${this.state.user}`)
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
				<form onSubmit={ this.fetchUser }>
					<input type="text" placeholder={'search user '} onChange={ this._handleChange }/>
					<button type="button" onClick={ this.fetchUser }>Get User Tweets</button>					
				</form>
				<button type="button" onClick={ this._generateTweet }>Generate Markov Chain Instance</button>
				<TweetList tweets={this.state.tweets}/>
      </div>
    );
  }
}

export default App;
