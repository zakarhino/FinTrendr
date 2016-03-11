import React from 'react';
import { Component } from 'react';
import Graph from './graph';
import  { getKeyword } from '../actions/keyword';
import KeywordList from './List/keyword_list';
import NewsList from './news/news_list';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import NavBar from './nav_bar';

class KeywordPage extends Component {
  constructor(props) {
    super(props);

    // this.props.getKeyword(this.props.params.keyword);
  }

  render() {
    return (
      <div>
        Welcome to the keyword page of Trendr. Search for a term.
        <div>this.props.params.keyword: {this.props.params.keyword}</div>
        <div>this.props.currentKeyword: {this.props.currentKeyword}</div>
      <div>this.props.currentKeywordData: {this.props.currentKeywordData}</div>

        <Graph />
        <KeywordList />
        <NewsList />
     </div>
    );
  }
}

function mapStatesToProps(state) {
  return { currentKeyword: state.keyword.current, currentKeywordData: state.keyword.data };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getKeyword }, dispatch);
}

export default connect(mapStatesToProps, mapDispatchToProps)(KeywordPage);