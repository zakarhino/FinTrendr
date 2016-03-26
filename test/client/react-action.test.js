import configureMockStore from 'redux-mock-store';
import redux_promise from 'redux-promise';
import * as keyword from '../../shared/actions/keyword'
import {GET_ALCHEMY,getAlchemyInfo} from '../../shared/actions/alchemy'
import * as hotTrends from '../../shared/actions/hotTrends'
import {LINEGRAPH_DATA,REMOVE_GRAPH,putToGraph,removeGraph} from '../../shared/actions/linegraph'
import {FETCH_NEWS,RESET_NEWS,getNews,resetNews} from '../../shared/actions/news'
import {SAVE_NEWKEYWORD,saveKeywordInfo} from '../../shared/actions/saveKeyword'
import {GET_STOCKS,RESET_STOCKS,getStocksInfo,emptyStockInfo} from '../../shared/actions/stocks'
import {FETCH_TWEETS,getTweets} from '../../shared/actions/tweets'
import nock from 'nock'
import should from 'should';


 const middlewares = [ redux_promise ]
const mockStore = configureMockStore(middlewares);
describe('Action and Redux Test', ()=>{
  afterEach(() => {
   nock.cleanAll()
 })

describe ('Redux basic Test',()=>{
  it('should dispatch action', ()=>
  {
    const getState = {}; // initial state of the store
    const getKeywordInfo = { type: keyword.GET_KEYWORD };

    const store = mockStore(getState);
    store.dispatch(getKeywordInfo);

    const actions = store.getActions();

    actions.should.deepEqual([getKeywordInfo]);

  })
})

  describe('Keyword Action', function (){
    it('should return for getKeyword', function(done){

      nock('http://localhost')
     .get('/api/keywordInfo/test')
     .reply(200, { body: {test:"test"}})

      const expectedAction = [{
        type: keyword.GET_KEYWORD,
        payload: {"test": "test"}
      }]

      const store =mockStore({ keyword: {} });
      store.dispatch(keyword.getKeyword('test')).then((data)=>{
        data.should.containDeep(expectedAction);
      }).then(done());
    })

    it('should create an action to getCorrelationInfo', (done) => {
      nock('http://localhost')
     .post('/api/correlationInfo/',{})
     .reply(200, { body: {test:'test'}})

      const expectedAction = [{
        type: keyword.GET_CORRELATIONINFO,
        payload: {test:'test'}
      }]

      const store =mockStore({ keyword: {} });
      store.dispatch(keyword.getCorrelationInfo('test')).then((data)=>{
        data.should.containDeep(expectedAction);
      }).then(done());
    })

    it('should create an action to resetCorrelationinfo', (done) => {
      const expectedAction = [{
        type: keyword.RESET_CORRELATIONINFO,
        payload: []
      }]

      const store =mockStore({ keyword: {} });
      store.dispatch(keyword.resetCorrelationinfo());
      store.getActions().should.deepEqual(expectedAction);
      done();
    })
  })

  describe('Hot Trend Action', () => {
    it('should create an action to getHotTrend', (done) => {

    nock('http://localhost')
   .post('/api/getHotTrendsInfo/',{})
   .reply(200, { body: {test:'test'}})

    const expectedAction = [{
      type: hotTrends.GET_HOTTRENDS,
      payload: {test:"test"}
    }]

    const store =mockStore({ keyword: {} });
    store.dispatch(hotTrends.getHotTrends('test')).then((data)=>{
      data.should.containDeep(expectedAction);
    }).then(done());
  })
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
