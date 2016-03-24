import axios from 'axios';

export const GET_STOCKS = "GET_STOCKS";
export const RESET_STOCKS = "RESET_STOCKS";

export function getStocksInfo(keyword) {
  let request = axios.post('/api/getStocksInfo', keyword);

  return {
    type: GET_STOCKS,
    payload: request
  };
};

export function emptyStockInfo(){
  return {
    type: RESET_STOCKS,
    payload: {}
  };
};
