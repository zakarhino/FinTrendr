import {GET_HOTTRENDS} from '../actions/hotTrends';

const INITIAL_STATE = { items: []};

export default function getHotTrends(state = INITIAL_STATE, action) {
  switch(action.type) {
    case GET_HOTTRENDS: {
      console.log("The Data for Hot Trends:", action.payload);
      return {...state, items: action.payload.data };
    }
    default: {
      return state;
    }
  }
}
