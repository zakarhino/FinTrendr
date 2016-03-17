import React from 'react';
import { Component } from 'react';
import SearchBar from './search_bar';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getHotTrends} from '../actions/hotTrends'



class LandingPage extends Component {
  componentWillMount() {
    this.props.getHotTrends();
  }
  render() {
    return (
      <div>
        Welcome to the landing page of Trendr. Search for a term.
      </div>
    );
  }
}
function mapStatesToProps(state) {
  return {hotTrends: state.hotTrends.items};
}
export default connect(mapStatesToProps, {getHotTrends})(LandingPage);