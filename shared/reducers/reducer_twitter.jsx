import { FETCH_TWEETS } from '../actions/tweets';

const INITIAL_STATE = { all: [] };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_TWEETS:
      return { ...state, all: action.payload.data.items };
    default:
      return state;
  }
}