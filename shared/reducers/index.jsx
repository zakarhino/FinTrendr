<<<<<<< HEAD
import {combineReducers} from 'redux'
import keyword from './reducer_keyword';

export default combineReducers({
  keyword
})
=======
import { combineReducers } from 'redux';
import keywords from './reducer_keyword';
import list from './reducer_list';
 
const rootReducer = combineReducers({
  keywords: keywords,
  list: list
});

export default rootReducer;
>>>>>>> (react) update to keyword list
