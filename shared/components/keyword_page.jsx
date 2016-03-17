import React from 'react';
import {Component} from 'react';
import Graph from './graph';
import {getKeyword} from '../actions/keyword';
import KeywordList from './List/keyword_list';
import NewsList from './news/news_list';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import NavBar from './nav_bar';
import TweetList from './twitter/tweet_list';
import TreeMapView from './List/treemap_view';

class KeywordPage extends Component {
  constructor(props) {
    super(props);
    //this.setState({keyword:this.props.params.keyword})
    this.state = {listView: true};

  }

  switchView(){
    console.log(this.state.listView);
    if (this.state.listView)
    {
        this.setState({listView: false});
    }
    else {
        this.setState({listView: true});
    }
  };

  render() {
    console.log('In Render', this.props.params.keyword);
    let keywordCorrView = {};
    console.log(this.state.listView);

    if (this.state.listView) {
      keywordCorrView = <KeywordList/>;
    } else {
      keywordCorrView = <TreeMapView/>;
    }
    return (
      <div>
        Welcome to the keyword page of Trendr. Search for a term.
        <div>this.props.params.keyword: {this.props.params.keyword}</div>
        <button type='button' className="btn btn-primary" onClick={this.switchView.bind(this)}>CHANGE!</button>
        {keywordCorrView}
        <Graph/>
        <NewsList/>
      </div>
    );
  }
}
function mapStatesToProps(state) {
  return {currentKeyword: state.keyword.current};
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getKeyword
  }, dispatch);
}
export default connect(mapStatesToProps, mapDispatchToProps)(KeywordPage);
