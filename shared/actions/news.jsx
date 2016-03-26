import axios from 'axios';
import parser from 'xml2js';

export const FETCH_NEWS = "FETCH_NEWS";
export const RESET_NEWS = "RESET_NEWS";

export function getNews(keyword,selectedKeyword) {
  const url = '/api/getNews';
  let request = axios.get(`${url}/${keyword.Keyword}`);
  if(selectedKeyword) {
    request = axios.get(`${url}/"${keyword.Keyword}" "${selectedKeyword}"`);
  }

  return {
    type: FETCH_NEWS,
    payload: request
  };
};

export function resetNews(){
  return {
    type: RESET_NEWS,
    payload : []
  }
}
