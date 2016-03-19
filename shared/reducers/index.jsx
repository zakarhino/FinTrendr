import {combineReducers} from 'redux';
import KeywordReducer from './reducer_keyword';
import NewsReducer from './reducer_news';
import TweetReducer from './reducer_twitter';
import List from './reducer_list';
import getStocks from './reducer_stocks';
import getHotTrends from './reducer_hotTrends';
import putToGraph from './reducer_puttograph';


export default combineReducers({
  keyword: KeywordReducer,
  news: NewsReducer,
  tweets: TweetReducer,
  list: List,
  stocks: getStocks,
  hotTrends: getHotTrends,
  linegraph: putToGraph
});
