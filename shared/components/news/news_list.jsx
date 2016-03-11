import React, { Component } from 'react';
import { parseString } from 'xml2js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getNews } from '../../actions/news';

class NewsList extends Component {
  componentWillMount() {
    this.props.getNews("Clinton");
  }

  renderArticles() {
    return this.props.news.map((article) => {
      return (
        <li key={article.guid}>
          <h4>{article.title}</h4>
          <h5>{article.pubDate}</h5>
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        Related News:
        <ul>
          {this.renderArticles()}
        </ul>
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
