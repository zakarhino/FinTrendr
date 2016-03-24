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
          <h1 className="mainTitle"><a href="/" className="title-link">Trendr</a></h1>
          <h6 className="subTitle"><a href="/" className="title-link">Lets Get Trending</a></h6>
          <div className="row">
          <div className="col-md-offset-5 search">
            <SearchBar />
          </div>
          </div>
        </nav>
          {this.props.children}
      </div>
    );
  }
}
