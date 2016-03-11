import { FETCH_NEWS } from '../actions/news';

const INITIAL_STATE = { all: [] };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
  case FETCH_NEWS:
    return { ...state, all: action.payload.data.items };
  default:
    return state;
  }
}
