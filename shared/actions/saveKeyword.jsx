import axios from 'axios';

export const SAVE_NEWKEYWORD = "SAVE_NEWKEYWORD";

export function saveKeywordInfo(newKeyword,oldKeyword) {
  let request = axios.post('/api/saveKeywordInfo', {
      newKeyword: {
        newKeyword: newKeyword,
        oldKeyword: oldKeyword.Keyword,
        oldKeywordData: oldKeyword.data
      }
  });

  return {
    type: SAVE_NEWKEYWORD,
    payload: request
  };
};
