import {GET_CORRELATIONINFO} from '../actions/keyword';

const INITIAL_STATE = { items: []};

export default function listReducer(state = [], action) {
  switch(action.type) {
    case GET_CORRELATIONINFO: {
      console.log('get corr info reducer invoked');
      return  {...state, items: action.payload } ;
    }
    default: {
      return state;
    }
  }
}
