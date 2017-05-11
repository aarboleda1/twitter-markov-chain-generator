import React, { Component } from 'react';

class Search extends Component {
		constructor(props) {
			super(props);
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
				<form onSubmit={(e) => this.props.fetchUser.call(this, e, this.state.user) }>
					<input type="text" placeholder={'search user '} onChange={ this._handleInputChange }/>
					<button type="button" onClick={() =>  this.props.fetchUser.call(this, this.state.user) }>Get User Tweets</button>					
				</form>
			</div>
			)
		}
}
export default Search;