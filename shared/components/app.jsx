import React, { Component } from 'react';
import SearchBar from './search_bar';

export default class App extends Component {
  render() {
    return (
      <div>
        Welcome to Trendr. Get Trending.
        <SearchBar />
        {this.props.children}
      </div>
    );
  }
}
