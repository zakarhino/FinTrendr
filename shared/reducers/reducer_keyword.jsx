import { GET_KEYWORD } from '../actions/keyword';

const INITIAL_STATE = { current: '', data: [] };

export default function keywordReducer(state = INITIAL_STATE, action) {
  if(action.payload) console.log("Action Payload:", action.type, action.payload);
  switch(action.type) {
    case GET_KEYWORD: {
      console.log('get keyword info',action.payload.data);
      return { ...state, current: action.payload.data};
    }
    default: {
      return state;
    }
  }
}
