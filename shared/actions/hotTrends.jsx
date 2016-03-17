import axios from 'axios';

export const GET_HOTTRENDS = "GET_HOTTRENDS";

export function getHotTrends(keyword) {
  let request = axios.get('http://localhost:3000/api/getHotTrendsInfo');
  return {
    type: GET_HOTTRENDS,
    payload: request
  };
};
