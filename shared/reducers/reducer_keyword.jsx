import GET_KEYWORD from '../actions/keyword';

export default function keywordReducer(state = null, action) {
  switch(action.type) {
    case GET_KEYWORD: {
      return action.payload;
    }
    default:
      return state;
  }
}