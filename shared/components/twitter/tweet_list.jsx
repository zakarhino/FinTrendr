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
        <li key={tweet.guid} className="list-group-item noRad">
          <p>{tweet.name}</p>
          <p><a href={tweet.url}>{tweet.tweet_volume}</a></p>
        </li>
      );
    });
  }

  render() {
    return (
      <div className="tweets spacer">
        <h3>Trending Tweets:</h3>
        <ul className="list-group noRad">
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