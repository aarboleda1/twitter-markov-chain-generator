import React from 'react';
import PropTypes from 'prop-types';

const TweetItem = ({tweet}) => {
	return(
		<li>{tweet}</li>
	)
}

TweetItem.propTypes = {
	tweet: PropTypes.string.isRequired 
};
export default TweetItem;