import React from 'react';
import { Component } from 'react';
import SearchBar from './search_bar';
import {Link} from 'react-router';

export class NavBar extends Component {
  render(){
  return (
    <nav className="navbar navbar-dark navbar-fixed-top bg-inverse bottomGreen">
      <a href="/" className="title-link  col-md-3 col-sm-4">
        <img src="/img/BarsWhite.png" height="70" className="pull-xs-left" />
        <h1 className="mainTitle">Trendr</h1>
      </a>
      <div className="navbar-right">
        <form className="navbar-form search" role="search">
          <SearchBar />
        </form>
        <Link to="/about" className="info-icon">
          <img src="/img/InfoWhite.png" width="30" />
        </Link>
      </div>
    </nav>
  );
  }
}
