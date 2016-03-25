import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, IndexLink} from 'react-router'
import {getKeyword, resetCorrelationinfo} from '../actions/keyword';
import {resetNews} from '../actions/news';
import {bindActionCreators} from 'redux';
import {emptyStockInfo} from '../actions/stocks';
import {Tabs, Tab} from 'react-bootstrap';
import {NavBar} from './nav_bar';

class MainPanel extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    console.log('In Main Panel', this.props.currentKeyword, this.props.params.keyword)
    if (!this.props.currentKeyword || this.props.params.keyword !== this.props.currentKeyword) {
      this.props.getKeyword(this.props.params.keyword);
      console.log("will mount", this.props);
      this.props.emptyStockInfo();
      this.props.resetNews();
      this.props.resetCorrelationinfo();
    }
    console.log('will mount and trigger service',);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.currentKeyword.Keyword !== this.props.params.keyword) {
      console.log("will recieve props", this.props,nextProps);
      this.props.getKeyword(this.props.params.keyword);
      this.props.emptyStockInfo();
      this.props.resetNews();
      this.props.resetCorrelationinfo();
    }
  }
  render() {
    const path = `/k/${this.props.params.keyword}`;
    return (
      <div>
        <NavBar />
        <ul className="nav nav-pills">
            <li className="nav-item"><IndexLink to={path} className="nav-link" activeClassName="active">Search Trend</IndexLink>
            </li>
            <li className="nav-item"><Link to={`${path}/stock`} className="nav-link" activeClassName="active">Stock Trend</Link></li>
        </ul>
          {this.props.children}
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
    emptyStockInfo
  }, dispatch);
}
export default connect(mapStatesToProps, mapDispatchToProps)(MainPanel);
