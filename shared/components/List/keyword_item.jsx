import React from 'react';
import { Component } from 'react';

export default class KeywordItem extends Component {
  render(){
    return (
      <li onClick={() => onKeywordSelect(keyword)} className="">
        <div>
          { keyword }
        </div>
      </li>
    );
  }
}
/*
const KeywordItem = ({keyword, onKeywordSelect}) => {
  return (
    <li onClick={() => onKeywordSelect(keyword)} className="">
      <div>
        { keyword }
      </div>
    </li>
  );
}

export default KeywordItem;
*/