import { GET_STOCKS ,RESET_STOCKS } from '../actions/stocks';

const INITIAL_STATE = { items: {} };

export default function getStocks(state = INITIAL_STATE, action) {
  switch(action.type) {
  case GET_STOCKS:
    return { ...state, items: action.payload.data };
  case RESET_STOCKS:
    return { ...state, items:action.payload};
  default:
    return state;
  }
}
