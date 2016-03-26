import React from 'react';
import { Component } from 'react';
import SearchBar from './search_bar';

export class NavBar extends Component {
  render(){
  return (
    <nav className="navbar navbar-dark navbar-fixed-top bg-inverse bottomGreen">
      <a href="/" className="title-link">
        <img src="/img/BarsWhite.png" height="70" className="pull-xs-left" />
      </a>
      <a href="/" className="title-link">
        <img src="/img/TextWhite.png" height="60" className="pull-xs-left" />
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
