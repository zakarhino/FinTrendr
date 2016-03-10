import {GET_KEYWORD} from '../actions/keyword';

export default function keywordReducer(state = null, action) {
  switch(action.type) {
    case GET_KEYWORD: {
      console.log('keyword logged');
      return {...state, keyword: action.payload.Keyword};
    }
    default: {
      console.log('keyword NOT logged');
      return state;
    }
  }
}
