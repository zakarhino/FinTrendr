import React, { Component } from 'react';
import { parseString } from 'xml2js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getNews } from '../../actions/news';

class NewsList extends Component {
  componentWillMount() {
    this.props.getNews();
  }

  render() {
    console.log("this.props.all:", this.props.news);
    return (
      <div>
        Test of news list
        {this.props.news}
      </div>
    );
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getNews }, dispatch);
};

function mapStateToProps(state) {
  return { news: state.news.all };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsList);
