import React, {Component} from 'react';
import {parseString} from 'xml2js';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getNews} from '../../actions/news';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ReactToolTip from 'react-tooltip';

class NewsList extends Component {
  componentWillMount() {
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.term.Keyword !== nextProps.term.Keyword) {
      this.props.getNews(nextProps.term);
    }
      if(this.props.term.Keyword === nextProps.term.Keyword && this.props.linegraph[0] !== nextProps.linegraph[0]) {
        this.props.getNews(nextProps.term,nextProps.linegraph[0].key);
      }
  }
  renderArticles() {
    let count = 0;
    return this.props.news.map((article) => {
      count++;
      return (
        <li key={article.guid}  className="list-group-item" data-tip data-for={`article-${count}`}>
          <p><a href={article.link} target="_blank">{article.title}</a></p>
          <p>{article.pubDate}</p>
          <ReactToolTip id={`article-${count}`} type='error'>
            {article.contentSnippet}
          </ReactToolTip>
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
          <ReactCSSTransitionGroup transitionName="newsExample" transitionEnterTimeout={500} transitionLeaveTimeout={300} transitionAppear={true}>
            {this.renderArticles()}
            </ReactCSSTransitionGroup>
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
  return {news: state.news.all, term: state.keyword.current, linegraph: state.linegraph.linegraph};
};
export default connect(mapStateToProps, mapDispatchToProps)(NewsList);
