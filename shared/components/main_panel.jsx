import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router'
import {getKeyword} from '../actions/keyword';
import {bindActionCreators} from 'redux';

class MainPanel extends Component {
  constructor(props){
    super(props);
    console.log(props);
  }
  componentWillMount(){
     console.log('In Main Panel', this.props.currentKeyword,this.props.params.keyword )
    if (!this.props.currentKeyword|| this.props.params.keyword!== this.props.currentKeyword) {
      this.props.getKeyword(this.props.params.keyword);
    }
    console.log('will mount and trigger service',);
  }

  render(){
    const path = `/k/${this.props.params.keyword}`;
    return (
    <div>
      <div className="sidebar col-md-1">
         <ul className="nav nav-sideBar">
            <li><Link to={path}>Dashboard</Link></li>
            <li><Link to={path+'/stock'}>Stock View</Link></li>
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
    getKeyword
  }, dispatch);
}
export default connect(mapStatesToProps,mapDispatchToProps)(MainPanel);
