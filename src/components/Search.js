import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Search extends Component {
		constructor(props) {
			super(props)
			this.state = {
				user: ''
			}
			this._handleInputChange = this._handleInputChange.bind(this);
		}

		_handleInputChange(e) {
			e.preventDefault();
			this.setState({
				user: e.target.value
			})
		}	
		focus() {
			this.inputEl.focus();
		}

		render() {
			return (
				<form onSubmit={ (e) =>  this.props.handleSubmit.call(this, e, this.state.user) }>
					<input 
						id="myInput"
						type="text"
						placeholder={ 'search user'} 
						onChange={ this._handleInputChange}
						ref={(el) => this.inputEl = el }/>						
					<button type="button" 
						onClick={ (event) => this.props.handleSubmit(event, this.state.user) }>
						Get User Tweets
					</button>					
				</form>
			)
		}
}
Search.propTypes = {
	handleSubmit: PropTypes.func.isRequired
};

export default Search;