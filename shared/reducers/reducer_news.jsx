import { FETCH_NEWS,RESET_NEWS } from '../actions/news';

const INITIAL_STATE = { all: [] };

export default function newsReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
  case FETCH_NEWS:
    return { ...state, all: action.payload.data };
  case RESET_NEWS:
    return {...state, all: action.payload}
  default:
    return state;
  }
}
