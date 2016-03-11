import { combineReducers } from 'redux';
import keyword from './reducer_keyword';
import list from './reducer_list';
 
const rootReducer = combineReducers({
  keyword: keyword,
  list: list
});

export default rootReducer;

