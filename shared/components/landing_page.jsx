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

  renderDBTrends() {
    return this.props.hotTrends.randomTen.map( (item,index) => {
      if(index < 6 ) {
      return (
        <div className="col-sm-4" key={item}> 
          <div className='card card-block card-success text-xs-center'> {item} </div>
        </div>
      );
    }
    });
  }

  renderTweets() {
    return this.props.hotTrends.stocks.map( (item,index) => {
      if(index < 6) {
      return (
        <div className="col-sm-4" key={item}> 
          <div className='card card-block card-info text-xs-center'> {item} </div>
        </div>
      );
    }
    });
  }
  renderKeywords() {
    return this.props.hotTrends.keywords.map( (item,index) => {
      if(index < 6) {
      return (
        <div className="col-sm-4" key={item}> 
          <div className='card card-block card-success text-xs-center'> {item} </div>
        </div>
      );
    }
    });
  }

  render() {
    if(!this.props.hotTrends) {
      return (
        <div> Loading... </div>
      )
    }

    return (
      <div className="list spacer">
        <h2> Trends Last Month </h2>
        <div className="row">
          {this.renderDBTrends()}
        </div>
        <h2> Twitter Today </h2>
        <div className="row">
          {this.renderTweets()}
        </div>
        <h2> Trends This Hour </h2>
        <div className="row">
          {this.renderKeywords()}
        </div>
      </div>
    );
  }
}

function mapStatesToProps(state) {
  return {hotTrends: state.hotTrends.items};
}
export default connect(mapStatesToProps, {getHotTrends})(LandingPage);