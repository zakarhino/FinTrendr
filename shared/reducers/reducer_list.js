import {GET_CORRELATIONINFO} from '../actions/keyword';

export default function listReducer(state = [], action) {
  switch(action.type) {
    case GET_CORRELATIONINFO: {
      console.log('get corr info reducer invoked');
      return  [action.payload] ;
    }
    default: {
      return state;
    }
  }
}