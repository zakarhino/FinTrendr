import axios from 'axios';

export const GET_STOCKS = "GET_STOCKS";

export function getStocksInfo(keyword) {
  let request = axios.post('/api/getStocksInfo', keyword);

  return {
    type: GET_STOCKS,
    payload: request
  };
};
