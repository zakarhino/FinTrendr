import React from 'react';
import { Component } from 'react';
import SearchBar from './search_bar';
import Graph from './graph';
import NavBar from './nav_bar';
import KeywordList from '../List/keyword-list';
import NewsList from '../news/news_list';

export default class LandingPage extends Component {
  

  render() {
    return (
     <div>
     Welcome to the landing page of Trendr. Search for a term.
      <NavBar />
      <SearchBar />
      <Graph />
      <KeywordList />
      <NewsList />
     </div> 
    );  
  }
}