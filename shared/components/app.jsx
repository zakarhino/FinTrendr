import React, { Component } from 'react';
import {Link} from 'react-router';

export default class App extends Component {
  constructor(props){
    super(props);
    //console.log(this.state);
  }
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
