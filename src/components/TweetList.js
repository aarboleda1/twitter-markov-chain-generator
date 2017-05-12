import React from 'react';
import PropTypes from 'prop-types';
import TweetItem from './TweetItem';

const TweetList = ({tweets}) => {
	return(
		<ul style={{listStyle: "none"}}>
			{tweets.map((tweet, index) => {
				return <TweetItem key={index} tweet={tweet}/>
			})}
		</ul>
	)
}
TweetList.propTypes = {
	tweets: PropTypes.arrayOf(PropTypes.string)
};
export default TweetList;