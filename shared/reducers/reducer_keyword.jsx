import { GET_KEYWORD } from '../actions/keyword';

const INITIAL_STATE = { current: null, data: [] };

export default function keywordReducer(state = INITIAL_STATE, action) {
  if(action.payload) console.log("Action Payload:", action.payload);
  switch(action.type) {
  case GET_KEYWORD:
    console.log('keyword logged');
    return { ...state, current: action.payload.data.Keyword, data: action.payload.data.data };
  default:
    console.log('keyword NOT logged');
    return state;
  }
}
