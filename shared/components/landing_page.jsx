import React from 'react';
import { Component } from 'react';
import SearchBar from './search_bar';

export default class LandingPage extends Component {
  

  render() {
    return (
     <div>
     Welcome to the landing page of Trendr. Search for a term.
      <SearchBar />
     </div> 
    );  
  }
}