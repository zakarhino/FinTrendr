import {GET_HOTTRENDS} from '../actions/hotTrends';

const INITIAL_STATE = { items: []};

export default function getHotTrends(state = INITIAL_STATE, action) {
  switch(action.type) {
    case GET_HOTTRENDS: {
      return {...state, items: action.payload.data };
    }
    default: {
      return state;
    }
  }
}
