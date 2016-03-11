import React from 'react';
import { Component } from 'react';
import SearchBar from './search_bar';
import Graph from './graph';
import  { getKeyword } from '../actions/keyword';
import KeywordList from './List/keyword_list';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';

class KeywordPage extends Component {
  constructor(props)
   {
    super(props);
    console.log('in keywordpage', this.props.params.keyword);

    this.props.getKeyword(this.props.params.keyword)
  }

  render() {
    return (
     <div>
    Welcome to the keyword page of Trendr. Search for a term.
     {this.props.params.keyword}
     {this.props.currentKeyword}
      
      <SearchBar /> 
      <Graph />
      <KeywordList />
     </div> 
    );  
  }
}

function mapStatesToProps(state) {
  return { currentKeyword: state.keyword};
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators( { getKeyword }, dispatch);
}

export default connect(mapStatesToProps,mapDispatchToProps)(KeywordPage);
