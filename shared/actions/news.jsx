import axios from 'axios';
import { parseString } from 'xml2js';

export const FETCH_NEWS = "FETCH_NEWS";

export function getNews(keyword) {
  let request = axios.get(`http://rss2json.com/api.json?rss_url=https%3A%2F%2Fnews.google.com%2Fnews%3Fq%3D${keyword}%26output%3Drss`);

  return {
    type: FETCH_NEWS,
    payload: request
  };
};
