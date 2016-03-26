import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, IndexLink} from 'react-router'
import {getKeyword, resetCorrelationinfo} from '../actions/keyword';
import {resetNews} from '../actions/news';
import {bindActionCreators} from 'redux';
import {emptyStockInfo} from '../actions/stocks';
import {removeGraph} from '../actions/linegraph';
import {Tabs, Tab} from 'react-bootstrap';
import {NavBar} from './nav_bar';

class MainPanel extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    console.log('In Main Panel', this.props.currentKeyword, this.props.params.keyword)
    // If redux has no keyword information or when the page is being load with param
    if (!this.props.currentKeyword || this.props.params.keyword !== this.props.currentKeyword.Keyword) {
      this.setupKeyword(this.props.params.keyword);
    }
    console.log('will mount and trigger service',);
  }
  componentWillReceiveProps(nextProps) {
    console.log('in recevie props', nextProps,this.props)
    if (nextProps.currentKeyword.Keyword !== this.props.params.keyword) {
      console.log("will recieve props", this.props,nextProps);
        this.setupKeyword(this.props.params.keyword);
    }
    // If new search from search bar while on search result page
    // next param will be different from current keyword;
    else if (nextProps.currentKeyword.Keyword !== nextProps.params.keyword){
      this.setupKeyword(nextProps.params.keyword);
    }
  }

  setupKeyword(keyword){
    this.props.getKeyword(keyword);
    this.props.emptyStockInfo();
    this.props.resetNews();
    this.props.resetCorrelationinfo();
    this.props.removeGraph();
  }
  render() {
    const path = `/k/${this.props.params.keyword}`;
    return (
      <div>
        <NavBar />
        <div className="container">
          <ul className="nav nav-pills">
              <li className="nav-item"><IndexLink to={path} className="nav-link" activeClassName="active">Search Trend</IndexLink>
              </li>
              <li className="nav-item"><Link to={`${path}/stock`} className="nav-link" activeClassName="active">Stock Trend</Link></li>
          </ul>
            {this.props.children}
        </div>
      </div>
    )
  }
}
function mapStatesToProps(state) {
  return {currentKeyword: state.keyword.current};
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    resetCorrelationinfo,
    resetNews,
    getKeyword,
    emptyStockInfo,
    removeGraph
  }, dispatch);
}
export default connect(mapStatesToProps, mapDispatchToProps)(MainPanel);
