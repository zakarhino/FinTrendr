import React, { Component } from 'react';
import SearchBar from './search_bar';

export default class App extends Component {
  constructor(props){
    super(props);
    console.log(this.state);
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark navbar-fixed-top bg-inverse bottomGreen">
          <img src="/img/BarsWhite.png" className="pull-xs-left" width="70"/>
          <h1 className="mainTitle">Trendr</h1>
          <h6 className="subTitle">Lets Get Trending</h6>
          <nav className="pull-xs-right search">
            <SearchBar />
          </nav>
        </nav>
          {this.props.children}
      </div>
    );
  }
}
