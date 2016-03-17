import {GET_CORRELATIONINFO} from '../actions/keyword';

const INITIAL_STATE = { items: []};

export default function listReducer(state = INITIAL_STATE, action) {
  if(action.payload) console.log("Action Payload:", action.type, action.payload);
  switch(action.type) {
    case GET_CORRELATIONINFO: {
      console.log("The Data:", action.payload.data);
      return {...state, items: action.payload.data };
    }
    default: {
      return state;
    }
  }
}
