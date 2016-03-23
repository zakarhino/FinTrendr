import React, {Component} from 'react';
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

      </div>
        <div>
          {this.props.children}
        </div>
      </div>
    )
  }

}

//  <ul className="nav nav-sideBar">
  //   <li><Link to={`/k/${this.props.params.keyword}`}>Dashboard</Link></li>
  //   <li><Link to={`/k/${this.props.params.keyword}/stock`}>Stock View</Link></li>
  //   <li>About us</li>
  // </ul>
// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({
//     setPage
//   }, dispatch);
// }
// export default connect(null,mapDispatchToProps)(MainPanel);
