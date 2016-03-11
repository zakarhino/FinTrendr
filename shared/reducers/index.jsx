import {combineReducers} from 'redux';
import KeywordReducer from './reducer_keyword';
import NewsReducer from './reducer_news';
import List from './reducer_list';

export default combineReducers({
  keyword: KeywordReducer,
  news: NewsReducer,
  list: List
});