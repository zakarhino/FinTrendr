import { GET_KEYWORD } from '../actions/keyword';

const INITIAL_STATE = { current: null };

export default function keywordReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case GET_KEYWORD: {
      console.log('keyword logged');
      return { ...state, current: action.payload.Keyword };
    }
    default: {
      console.log('keyword NOT logged');
      return state;
    }
  }
}
