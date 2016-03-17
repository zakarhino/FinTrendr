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
        <h1>Welcome to Trendr. Get Trending.</h1>
        <SearchBar />
        {this.props.children}
      </div>
    );
  }
}
