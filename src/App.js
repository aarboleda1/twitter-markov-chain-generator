import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { make_tweet, fillDataStore } from './MarkovGenerator';
import axios from 'axios';
    
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

	_displayTweets() {
		return this.state.tweets.map((tweet, index) => {
			return <li key={index}>{tweet}</li>
		})
	}

	_generateTweet() {
		var tweet = make_tweet(3 + Math.floor(3 * Math.random()));
		this.setState({
			tweets: [tweet].concat(this.state.tweets)
		})
	}

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <h2>Markov Chain Generator</h2>
        </div>
				<form onSubmit={ this.fetchUser }>
					<input type="text" placeholder={'search user '}onChange={ this._handleChange }/>
					<button type="button" onClick={ this._generateTweet }>Generate Tweet</button>
				</form>
				<ul>
					{ this._displayTweets() }
				</ul>
      </div>
    );
  }
}

export default App;
