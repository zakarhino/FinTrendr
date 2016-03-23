import {GET_ALCHEMY} from '../actions/alchemy';

const INITIAL_STATE = { items: ''};

export default function getAlchemyInfo(state = INITIAL_STATE, action) {
  switch(action.type) {
    case GET_ALCHEMY: {
      return {...state, items: action.payload.data };
    }
    default: {
      return state;
    }
  }
}
