//twitter_list.jsx
import React, { Component } from 'react';
import { parseString } from 'xml2js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getTweets } from '../../actions/tweets';

class TweetList extends Component {
  componentWillMount(){
    this.props.getTweets(this.props.term);
  }

  renderTweets() {
    return this.props.tweets.map((tweet) => {
    console.log("tweets", this.props.tweets);
      return (
        <li key={tweet.guid}>
          <h4>{tweet.name}</h4>
          <h5><a href={tweet.url}>{tweet.tweet_volume}</a></h5>
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        Trending Tweets:
        <ul>
          {this.renderTweets()}
        </ul>
      </div>
    );
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({getTweets}, dispatch);
};

function mapStateToProps(state) {
  return { tweets: state.tweets.all, term: state.keyword.current };
};

export default connect(mapStateToProps, mapDispatchToProps)(TweetList);