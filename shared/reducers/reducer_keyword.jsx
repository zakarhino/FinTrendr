import { GET_KEYWORD } from '../actions/keyword';

const INITIAL_STATE = { current: '', data: [] };

export default function keywordReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case GET_KEYWORD: {
      return { ...state, current: action.payload.data};
    }
    default: {
      return state;
    }
  }
}
