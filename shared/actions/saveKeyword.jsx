import axios from 'axios';

export const SAVE_NEWKEYWORD = "SAVE_NEWKEYWORD";

export function saveKeywordInfo(newKeyword,oldKeyword) {
  console.log('triggered');
  let request = axios.post('/api/saveKeywordInfo', {
      newKeyword: {
        newKeyword: newKeyword,
        oldKeyword: oldKeyword.Keyword
      }
  });

  return {
    type: SAVE_NEWKEYWORD,
    payload: request
  };
};
