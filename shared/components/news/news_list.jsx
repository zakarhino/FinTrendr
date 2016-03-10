import React, { Component } from 'react';
import { parseString } from 'xml2js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getNews } from '../../actions/news';

class NewsList extends Component {
  render() {
    return (
      <div>Test of news list</div>
    );
  }
};

export default connect()
