import React, {Component} from 'react';
import {parseString} from 'xml2js';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getNews} from '../../actions/news';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ReactToolTip from 'react-tooltip';
import {getAlchemyInfo} from '../../actions/alchemy';
import {OverlayTrigger, Popover, Panel, ListGroup, ListGroupItem} from 'react-bootstrap';
class NewsList extends Component {
  componentWillMount() {
    if (this.props.term.Keyword && this.props.news.length ===0) {
      this.props.getNews(this.props.term.Keyword );
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.term.Keyword !== nextProps.term.Keyword || this.props.linegraph.length>0 &&nextProps.linegraph.length===0) {
      this.props.getNews(nextProps.term);
    }
    else if (this.props.term.Keyword === nextProps.term.Keyword && this.props.linegraph[0] !== nextProps.linegraph[0]) {
      this.props.getNews(nextProps.term, nextProps.linegraph[0].key);
    }
  }
  alchemyInfo(articleLink) {
    if (this.props.linegraph[0]) {
      this.props.getAlchemyInfo(this.props.term.Keyword, this.props.linegraph[0].key, articleLink);
    }
  }
  renderArticles() {
    let count = 0;
    return this.props.news.map((article) => {
      let picLink = "/img/questionmark.png";
      if (article.link === this.props.alchemy.url) {
        picLink = "/img/checkmark.png";
      }
      let popOver = (
        <Popover id="newsInfo" className="newsPopOver" title={article.title}>{article.contentSnippet}</Popover>
      );
      count++;
      return (
      // <li key={article.link}  className="list-group-item" onClick={this.alchemyInfo.bind(this,article.link)} data-tip data-for={`article-${count}`}>
      //   <p><a href={article.link} target="_blank">{article.title}</a></p>
      //   <p>{article.pubDate}</p>
      //   <ReactToolTip id={`article-${count}`} type='error'>
      //     {article.contentSnippet}
      //   </ReactToolTip>
      //   Click to check whether this article is relevant to you!
      //   <img src={picLink} width="15" height="15"/>
      // </li
      <li>
      <OverlayTrigger key={`article${count}`} trigger = { ['focus', 'hover']
      }
      placement = "left" overlay = {popOver}>
        <a class="list-group-item" target="_blank"  href={article.link}>
          <div class="col-md-7">
            <h5 class="list-group-item-heading">{article.title}</h5>
            <p class="list-group-item-text">{article.pubDate}</p>
         </div>
        <div class="col-md-5 pull-right">

        </div>
        </a>
    </OverlayTrigger>
    Click to Verify:
    <img class="list-group-item-text" src={picLink} width="20" height="20" onClick={this.alchemyInfo.bind(this,article.link)}/>
    </li>
      );
    });
  }
  render() {
    return (
      <div className="news spacer container">
        <img src="/img/News.png" width="40" className="pull-xs-left iconPadding" />
        <h3>Related News:</h3>
        <Panel>
          <ListGroup fill>
            <ReactCSSTransitionGroup transitionName="newsExample" transitionAppearTimeout={500} transitionLeaveTimeout={300} transitionAppear={true}>
              {this.renderArticles()}
            </ReactCSSTransitionGroup>
          </ListGroup>
        </Panel>
      </div>
    );
    }};
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
