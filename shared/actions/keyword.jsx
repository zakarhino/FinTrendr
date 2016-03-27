import axios from 'axios';

export const GET_KEYWORD = 'GET_KEYWORD';
export const GET_CORRELATIONINFO = 'GET_CORRELATIONINFO';
export const RESET_CORRELATIONINFO = 'RESET_CORRELATIONINFO';

export function getKeyword(keyword) {
  //add in the logic for getting  the return
  //from the db.getkeyword function (keyword and data)
  // in /api/ route then pass that as the payload
  // this will require a redux-promise
  const url = '/api/keywordInfo';
  const request = axios.get(`${url}/${keyword}`);

  return {
    type: GET_KEYWORD,
    payload: request
  };
};

export function getCorrelationInfo(keyword) {
  const url = '/api/correlationInfo';
  const request = axios.post(url,keyword);

return {
    type: GET_CORRELATIONINFO,
    payload: request
  };
};

export function resetCorrelationinfo(){
  return {
    type:RESET_CORRELATIONINFO,
    payload: []
  }
}

// export function getValidationInfo(keyword,listItem) {
//   const data = {
//     keyword: keyword,
//     listItem: listItem
//   };
//   const url = '/api/validationInfo';
//   const request = axios.post(url,data);
//
//   return {
//     type: GET_VALIDATIONINFO,
//     payload: request
//   };
// };
