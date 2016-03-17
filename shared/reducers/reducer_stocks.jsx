import { GET_STOCKS } from '../actions/stocks';

const INITIAL_STATE = { items: {} };

export default function getStocks(state = INITIAL_STATE, action) {
  switch(action.type) {
  case GET_STOCKS:
    return { ...state, items: action.payload.data };
  default:
    return state;
  }
}
