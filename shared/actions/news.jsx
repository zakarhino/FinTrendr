import axios from 'axios';
import { parseString } from 'xml2js';

export const GET_NEWS = "GET_NEWS";

export function getNews(keyword) {
  let request = axios.get(`https://news.google.com/news?q=${keyword}&output=rss`);
  
  return {
    type: GET_NEWS,
    payload: request
  };
};
