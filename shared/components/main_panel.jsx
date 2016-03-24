import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router'
import {getKeyword,resetCorrelationinfo } from '../actions/keyword';
import {resetNews} from '../actions/news';
import {bindActionCreators} from 'redux';
import {emptyStockInfo} from '../actions/stocks';

class MainPanel extends Component {
  constructor(props){
    super(props);
  }
  componentWillMount(){
     console.log('In Main Panel', this.props.currentKeyword,this.props.params.keyword )
    if (!this.props.currentKeyword|| this.props.params.keyword!== this.props.currentKeyword) {
      this.props.getKeyword(this.props.params.keyword);
      this.props.emptyStockInfo();
      this.props.resetNews();
      this.props.resetCorrelationinfo();
    }
    console.log('will mount and trigger service',);
  }

  componentWillReceiveProps(nextProps){
   if (nextProps.params.keyword !== this.props.currentKeyword.Keyword){
     this.props.getKeyword(this.props.params.keyword);
     this.props.emptyStockInfo();
     this.props.resetNews();
     this.props.resetCorrelationinfo();
   }
 }

  render(){
    const path = `/k/${this.props.params.keyword}`;
    return (
    <div>
      <div className="sidebar col-md-1">
         <ul className="nav nav-sideBar">
            <li><Link to={path} activeClassName='active'>Dashboard</Link></li>
            <li><Link to={path+'/stock'}  activeClassName='active'>Stock View</Link></li>
            <li>About us</li>
          </ul>
      </div>
        <div className="col-md-11">
          {this.props.children}
        </div>
      </div>
    )
  }
}
function mapStatesToProps(state){
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
export default connect(mapStatesToProps,mapDispatchToProps)(MainPanel);
