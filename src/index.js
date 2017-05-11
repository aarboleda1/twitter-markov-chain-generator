import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
const defaultTweets = 
[ 'Test',
  'Giving @getexponent a run this afternoon. Maybe #mobile isn\'t dead after all',
  'New blog post about REST and RESTful APIS https://t.co/CjPXzhuB8E',
  'story of my life @Mike_Mitrakos https://t.co/L8TCuXCjbu',
  'I just downloaded The JWT Handbook 📖 by @auth0. Everything you wanted to know about JWTs in one place. Check it out! https:t.co/ST0WrCqlhC',
  'Spent the weekend building out #MomComm at @AngelHack with @viv_viv_vivian. @HackReactor  starts next week',
  'could be so similar @_ericelliott',
  'Great article @_ericelliott \'Are Programmers Brains Different?\' I was a pro golfer b4 coming to SF as a programmer. never realized the 2' 
];

const container = document.getElementById('root')
ReactDOM.render(
  <App defaultTweets={defaultTweets}/>,
  container
);
