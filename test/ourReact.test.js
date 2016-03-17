import React from 'react';
import {shallow, mount, render} from 'enzyme';
import {expect} from 'chai';
import App from "../shared/components/app"
import TweetList from "../shared/components/twitter/tweet_list"

describe('React App component', function() {
  it('App text', function(){
    let app = shallow(<App/>);
    expect(app.find('h1').text()).to.equal('Welcome to Trendr. Get Trending.')
  });
});

// keyword list

// news 

// search bar

// nav bar

// graph

// twitter
// describe('React Tweets list', function(){
//   it('Tweet header', function(){
//     let tweets = shallow(<TweetList />);
//     expect(tweets.find('h2').text().to.equal('Trending Tweets:'))
//   })
// })