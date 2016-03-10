import React, { Component } from 'react';
import { connect } from 'react-redux';
import  { getCorrelationInfo } from '../../actions/keyword';

class KeywordList extends Component {
  constructor(props) {
    super(props);
    //invoke action creator that updates
    //the state that has the list of 10 things
    const tempData = {
      Keyword: "obama",
      data: [{"Feb2014":0},{"Mar2014":1},{"Apr2014":2},{"May2014":3},{"Jun2014":4},{"Jul2014":5},{"Aug2014":6},{"Sep2014":7},{"Oct2014":8},{"Nov2014":9},{"Dec2014":10},{"Jan2015":11},{"Feb2015":12},{"Mar2015":13},{"Apr2015":14},{"May2015":15},{"Jun2015":16},{"Jul2015":17},{"Aug2015":18},{"Sep2015":19},{"Oct2015":20},{"Nov2015":21},{"Dec2015":22},{"Jan2016":23}]
    };
    this.props.getCorrelationInfo(tempData);
  }

  render() {
     if(!this.props.list[0]) {
      return <div>Loading...</div>;
    }
    const list = this.props.list;
    return (
      <div>
        Some thing
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log('state is',state);
  return {
    list: state.list,
    keyword: state.keyword
  };
}

export default connect(mapStateToProps, {getCorrelationInfo})(KeywordList);