import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {GET_KEYWORD,GET_CORRELATIONINFO,RESET_CORRELATIONINFO,getCorrelationInfo,resetCorrelationinfo,getkeyword} from '../../shared/actions/keyword'
import {GET_ALCHEMY,getAlchemyInfo} from '../../shared/actions/alchemy'
import {GET_HOTTRENDS,getHotTrends} from '../../shared/actions/hotTrends'
import {LINEGRAPH_DATA,REMOVE_GRAPH,putToGraph,removeGraph} from '../../shared/actions/linegraph'
import {FETCH_NEWS,RESET_NEWS,getNews,resetNews} from '../../shared/actions/news'
import {SAVE_NEWKEYWORD,saveKeywordInfo} from '../../shared/actions/saveKeyword'
import {GET_STOCKS,RESET_STOCKS,getStocksInfo,emptyStockInfo} from '../../shared/actions/stocks'
import {FETCH_TWEETS,getTweets} from '../../shared/actions/tweets'
import nock from 'nock'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)
describe('Action and Redux Test', ()=>{
  describe('Keyword Action', () => {
    it('should create an action to add a todo', () => {
      const text = 'Finish docs'
      const expectedAction = {
        type: types.GET_KEYWORD,
        playload:
      }
      expect(getkeyword(text))
        .toEqual(expectedAction)
    })
    it('should create an action to add a todo', () => {
      const text = 'Finish docs'
      const expectedAction = {
        type: types.GET_CORRELATIONINFO,
        playload:
      }
      expect(getCorrelationInfo(text))
        .toEqual(expectedAction)
    })
    it('should create an action to add a todo', () => {
      const text = 'Finish docs'
      const expectedAction = {
        type: types.RESET_CORRELATIONINFO,
        playload :
      }
      expect(resetCorrelationinfo())
        .toEqual(expectedAction)
    })
  })

  describe('Hot Trend Action', () => {

  })


  describe('Alchemy Action', () => {

  })

  describe('Line Graph Action', () => {

  })

  describe('News Action', () => {

  })

  describe('New Keyword Action', () => {

  })

  describe('Stock Action', () => {

  })

  describe('Tweets Action', () => {

  })
})
