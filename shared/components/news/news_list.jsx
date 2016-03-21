import React, {Component} from 'react';
import {parseString} from 'xml2js';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getNews} from '../../actions/news';
class NewsList extends Component {
  componentWillMount() {

  }
  componentWillReceiveProps(nextProps) {
    if (this.props.term.Keyword !== nextProps.term.Keyword) {
      this.props.getNews(nextProps.term);
    }
  }
  renderArticles() {
    return this.props.news.map((article) => {
      return (
        <li key={article.guid} className="list-group-item">
          <p><a href="http://news.google.com">{article.title}</a></p>
          <p>{article.pubDate}</p>
        </li>
      );
    });
  }
  render() {
    return (
      <div className="news spacer">
        <img src="/img/News.png" width="40" className="pull-xs-left" />
        <h3>  Related News:</h3>
        <ul className="list-group">
          {this.renderArticles()}
        </ul>
      </div>
    );
  }
};
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getNews
  }, dispatch);
};
function mapStateToProps(state) {
  return {news: state.news.all, term: state.keyword.current};
};
export default connect(mapStateToProps, mapDispatchToProps)(NewsList);
