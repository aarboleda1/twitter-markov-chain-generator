import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Search extends Component {
		constructor({ fetchUser }) {
			super({ fetchUser })
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

		render() {
			return (
			<div className="search-bar form-inline">
				<form onSubmit={ (e) => this.fetchUser.call(this, e, this.state.user) }>
					<input type="text" placeholder={ 'search user'} onChange={ this._handleInputChange }/>
					<button type="button" onClick={ () => this.fetchUser.call(this, this.state.user) }>Get User Tweets</button>					
				</form>
			</div>
			)
		}
}
Search.propTypes = {
	fetchUser: PropTypes.func.isRequired
};

export default Search;