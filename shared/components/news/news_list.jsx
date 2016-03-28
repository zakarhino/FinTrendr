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
    else if(this.props.term.Keyword === nextProps.term.Keyword && this.props.linegraph[0] && this.props.news !== nextProps.news) {
      this.props.getAlchemyInfo(this.props.term.Keyword, this.props.linegraph[0].key, nextProps.news);
    }
  }

  renderArticles() {
    let count = 0;
    return this.props.news.map((article) => {
      let colorPicker = {'backgroundColor': "white"};
      if(this.props.alchemy.url) {
        if (this.props.alchemy.url.indexOf(article.link) >= 0) {
          colorPicker = {'backgroundColor': "#e6ffe6"};
        }
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
      // </li>
      <ReactCSSTransitionGroup
        transitionName="newsExample"
        transitionEnterTimeout={500}
        transitionAppearTimeout={500}
        transitionLeaveTimeout={300}
        transitionAppear={true}>
        <li key={article.link} className="news-list-item" style={colorPicker}>
        <OverlayTrigger trigger ={['focus', 'hover']}
        placement="left" overlay ={popOver}>
          <a target="_blank"  href={article.link}>
              <p className="news-item-text">{article.title}</p>
              <p className="news-item-date">{article.pubDate}</p>
          </a>
        </OverlayTrigger>
        </li>
      </ReactCSSTransitionGroup>
      );
    });
  }
  render() {
    return (
      <div className="drop-shadow container">
        <div className="newsPanel">
        </div>
        <div className="row">

          <div className="col-md-10">
            <img src="/img/News.png" width="20" className="pull-xs-left iconPadding" />
            <h5 >Related News:</h5>
          </div>
          <OverlayTrigger className='col-md-2' trigger={["hover","focus","click"]} placement="left" overlay={<Popover id="heatmapInfo" title="Learn More"><strong>Our Process: </strong> Related News displays recent news articles for the user Search Term and a selected Keyword Suggestion. A <strong style={{'background-color': '#e6ffe6', color: 'black'}}>Green</strong> shading indicates that article is relevant to both the user Search Term and the selected Suggested Keyword.</Popover>}>
              <img src="/img/questionmark.png" width="20" circle/>
          </OverlayTrigger>
          </div>
          <div className="news spacer">
          <Panel>
          <ListGroup fill className="news-list">
              {this.renderArticles()}
          </ListGroup>
        </Panel>
        </div>
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
