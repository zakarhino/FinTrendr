import { SAVE_NEWKEYWORD } from '../actions/saveKeyword';

const INITIAL_STATE = { items: {} };

export default function getStocks(state = INITIAL_STATE, action) {
  switch(action.type) {
  case SAVE_NEWKEYWORD:
  console.log('in getstocks with', action.payload.data)
    return { ...state, items: action.payload.data };
  default:
    return state;
  }
}
