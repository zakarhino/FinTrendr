import React, {Component} from 'react';
import {parseString} from 'xml2js';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getNews} from '../../actions/news';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ReactToolTip from 'react-tooltip';
import {getAlchemyInfo} from '../../actions/alchemy';

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

  alchemyInfo(articleLink) {
    if(this.props.linegraph[0]) {
      this.props.getAlchemyInfo(this.props.term.Keyword,this.props.linegraph[0].key,articleLink)
    }
  }

  renderArticles() {
    let count = 0;
    return this.props.news.map((article) => {
      let picLink = ""        
      if(article.link === this.props.alchemy.url) {
        picLink = "/img/checkmark.png";
      }

      count++;
      return (
        <li key={article.link}  className="list-group-item" onClick={this.alchemyInfo.bind(this,article.link)} data-tip data-for={`article-${count}`}>
          <p><a href={article.link} target="_blank">{article.title}</a></p>
          <p>{article.pubDate}</p>
          <ReactToolTip id={`article-${count}`} type='error'>
            {article.contentSnippet}
          </ReactToolTip>
          Click to check whether this article is relevant to you!
          <img src={picLink} width="15" height="15"/>
        </li>
      );
    });
  }
  render() {
    return (
      <div className="news spacer">
        <img src="/img/News.png" width="40" className="pull-xs-left" />
        <h3>Related News:</h3>
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
  let obj = {
    getNews: getNews,
    getAlchemyInfo: getAlchemyInfo
  };
  return bindActionCreators(obj, dispatch);
};

function mapStateToProps(state) {
  return {news: state.news.all, term: state.keyword.current, linegraph: state.linegraph.linegraph, alchemy: state.alchemy.items};
};
export default connect(mapStateToProps, mapDispatchToProps)(NewsList);
