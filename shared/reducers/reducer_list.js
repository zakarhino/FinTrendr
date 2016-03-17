import {GET_CORRELATIONINFO} from '../actions/keyword';

const INITIAL_STATE = { items: []};

export default function listReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case GET_CORRELATIONINFO: {
      return {...state, items: action.payload.data };
    }
    default: {
      return state;
    }
  }
}
