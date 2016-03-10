import React from 'react';
import { Component } from 'react';
import SearchBar from './search_bar';
// import Graph from './graph';
// import NavBar from './nav_bar';
// import KeywordList from './List/keyword_list';
// import NewsList from './news/news_list';

export default class KeywordPage extends Component {
  render() {
    return (
     <div>
        Welcome to the Keyword page of Trendr. Search for a term.
        <SearchBar />
     </div> 
    );  
  }
}