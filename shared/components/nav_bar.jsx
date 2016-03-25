import React from 'react';
import { Component } from 'react';
import SearchBar from './search_bar';

export class NavBar extends Component {
  render(){
  return (
    <nav className="navbar navbar-dark navbar-fixed-top bg-inverse bottomGreen">
      <a href="/" className="title-link col-md-2 col-sm-4">
        <img src="/img/BarsWhite.png" width="70" className="pull-xs-left" />
        <h1 className="mainTitle">Trendr</h1>
        <div className="subTitle">Lets Get Trending</div>
      </a>
      <div className="navbar-right">
        <form className="navbar-form search" role="search">
          <SearchBar />
        </form>
        <a href="about" className="info-icon">
          <img src="/img/InfoWhite.png" width="30" />
        </a>
      </div>
    </nav>
  );
  }
}
