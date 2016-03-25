import axios from 'axios';

export const GET_ALCHEMY = "GET_ALCHEMY";

export function getAlchemyInfo(keyword,item,url) {
  let reqObj = {};
  reqObj.keyword = keyword;
  reqObj.listItem = item;
  reqObj.urls = url;

  let request = axios.post('/api/getAlchemyInfo', reqObj);
  return {
    type: GET_ALCHEMY,
    payload: request
  };
};