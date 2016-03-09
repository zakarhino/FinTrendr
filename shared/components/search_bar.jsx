import React from 'react';
import { Component } from 'react';

class SearchBar extends Component {
  render(){
    <div>
      <input
        type="text"
        id="keyword"
        placeholder = "input a keyword" />
      <button
        type="button"
        className ="btn btn-primary"
        id='buttonSubmit'>
          submit
      </button>
    </div>
  }
}

export default SearchBar;