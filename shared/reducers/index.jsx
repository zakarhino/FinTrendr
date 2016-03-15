import {combineReducers} from 'redux';
import KeywordReducer from './reducer_keyword';
import NewsReducer from './reducer_news';
import TweetReducer from './reducer_twitter';
import List from './reducer_list';
import Validation from './reducer_validation';


export default combineReducers({
  keyword: KeywordReducer,
  news: NewsReducer,
  tweets: TweetReducer,
  list: List,
  validation: Validation,
});