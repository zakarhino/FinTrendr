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
        Welcome to Trendr. Get Trending!!!.
        <SearchBar />
        {this.props.children}
      </div>
    );
  }
}
