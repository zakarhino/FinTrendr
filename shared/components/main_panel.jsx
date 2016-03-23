import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router'

export class MainPanel extends Component {
  constructor(props){
    super(props);
    console.log(props);
  }
  componentWillMount(){
    console.log('will mount');
  }
  componentDidMount(){
    console.log('did mount');
  }
  render(){
    return (
    <div>
      <div className="sidebar">
         <ul className="nav nav-sideBar">
            <li><Link to='/'>Dashboard</Link></li>
            <li><Link to='/'>Stock View</Link></li>
            <li>About us</li>
          </ul>
      </div>
        <div>
          {this.props.children}
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setPage
  }, dispatch);
}
export default connect(null,mapDispatchToProps)(MainPanel);
