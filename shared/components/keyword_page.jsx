import React from 'react';
import { Component } from 'react';
import SearchBar from './search_bar';
<<<<<<< HEAD
// import Graph from './graph';
// import NavBar from './nav_bar';
// import KeywordList from './List/keyword_list';
// import NewsList from './news/news_list';
=======
import Graph from './graph';
import NavBar from './nav_bar';
import KeywordList from './List/keyword_list';
import NewsList from './news/news_list';

export default class KeywordPage extends Component {
  
>>>>>>> (react) update to keyword list

export default class KeywordPage extends Component {
  render() {
    return (
     <div>
<<<<<<< HEAD
        Welcome to the Keyword page of Trendr. Search for a term.
        <SearchBar />
=======
     Welcome to the keyword page of Trendr. Search for a term.
      <NavBar />
      <SearchBar />
      <Graph />
      <KeywordList />
      <NewsList />
>>>>>>> (react) update to keyword list
     </div> 
    );  
  }
}