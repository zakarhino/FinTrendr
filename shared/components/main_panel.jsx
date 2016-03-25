import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, IndexLink} from 'react-router'
import {getKeyword, resetCorrelationinfo} from '../actions/keyword';
import {resetNews} from '../actions/news';
import {bindActionCreators} from 'redux';
import {emptyStockInfo} from '../actions/stocks';
import {Tabs, Tab} from 'react-bootstrap';
class MainPanel extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    console.log('In Main Panel', this.props.currentKeyword, this.props.params.keyword)
    if (!this.props.currentKeyword || this.props.params.keyword !== this.props.currentKeyword) {
      this.props.getKeyword(this.props.params.keyword);
      this.props.emptyStockInfo();
      this.props.resetNews();
      this.props.resetCorrelationinfo();
    }
    console.log('will mount and trigger service',);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.params.keyword !== this.props.currentKeyword.Keyword) {
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
        <ul className="nav nav-pills">
            <li className="nav-item"><IndexLink to={path} className="nav-link" activeClassName="active">Search Trend</IndexLink>
            </li>
            <li className="nav-item"><Link to={`${path}/stock`} className="nav-link" activeClassName="active">Stock Trend</Link></li>
        </ul>
          {this.props.children}
      </div>
    )
    // <div>
    //   <Tabs defaultActiveKey={1} tabWidth={3}>
    //     <Link to={path}>
    //       <Tab eventKey={1} title="Tab 1">Dashboard</Tab>
    //     </Link>
    //     <Link to={path + '/stock'}>
    //       <Tab eventKey={2} title="Tab 2">Stock View</Tab>
    //     </Link>
    //   </Tabs>
    //   {this.props.children}
    // </div>
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
