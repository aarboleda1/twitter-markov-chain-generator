import React from 'react';
import TweetItem from './TweetItem';

const TweetList = ({tweets}) => {
	return(
		<ul>
			{tweets.map((tweet, index) => {
				return <TweetItem key={index} tweet={tweet}/>
			})}
		</ul>
	)
}
export default TweetList;