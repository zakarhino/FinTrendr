import React from 'react';
import { Component } from 'react';
import Graph from './graph';
import  { getKeyword } from '../actions/keyword';
import KeywordList from './List/keyword_list';
import NewsList from './news/news_list';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import NavBar from './nav_bar';
import TweetList from './twitter/tweet_list';

class KeywordPage extends Component {
  constructor(props) {
    super(props);
    //this.setState({keyword:this.props.params.keyword})
  }

  render() {
    console.log('In Render',this.props.params.keyword);
    return (
      <div>
        <TweetList />
        Welcome to the keyword page of Trendr. Search for a term.
        <div>this.props.params.keyword: {this.props.params.keyword}</div>
        <KeywordList />
        <Graph />
        
        <NewsList />
     </div>
    );
  }
}

function mapStatesToProps(state) {
  return { currentKeyword: state.keyword.current };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getKeyword }, dispatch);
}

export default connect(mapStatesToProps, mapDispatchToProps)(KeywordPage);
