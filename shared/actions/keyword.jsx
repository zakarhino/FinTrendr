import axios from 'axios';

export const GET_KEYWORD = 'GET_KEYWORD';
export const GET_CORRELATIONINFO = 'GET_CORRELATIONINFO';

export function getKeyword(keyword) {
  let request = axios.get(`http://localhost:3000/api/keywordInfo/${keyword}`);
  console.log('action creation invoked');
  return {
    type: GET_KEYWORD,
    payload: request
  };
};

export function getCorrelationInfo(keyword) {
  let request = axios.get(`http://localhost:3000/api/correlationInfo/${keyword}`);
  console.log('getcorrinfo invoked');

  return {
    type: GET_CORRELATIONINFO,
    payload: request
  };
};
