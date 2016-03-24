import {GET_CORRELATIONINFO, RESET_CORRELATIONINFO } from '../actions/keyword' ;
import {SAVE_NEWKEYWORD} from '../actions/saveKeyword' ;

const INITIAL_STATE = { items: []};

export default function listReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case GET_CORRELATIONINFO: {
      return {...state, items: action.payload.data };
    }
    case SAVE_NEWKEYWORD: {
      state.items.push(action.payload.data)
      return {...state, items: state.items};
    }
    case RESET_CORRELATIONINFO:{
      return {...state, items:action.payload}
    }
    default: {
      return state;
    }
  }
}
