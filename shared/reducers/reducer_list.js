import {GET_CORRELATIONINFO} from '../actions/keyword';

export default function listReducer(state = null, action) {
  switch(action.type) {
    case GET_CORRELATIONINFO: {
      console.log('get corr info reducer invoked');
      console.log(action.payload);
      return  {list: action.payload} ;
    }
    default: {
      return state;
    }
  }
}