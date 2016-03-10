import React from 'react';

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