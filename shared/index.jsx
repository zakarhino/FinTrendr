import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, browserHistory } from 'react-router';

import routes from './routes';
import promise from 'redux-promise';

import reducer from './reducers';

var initialState = window.__INITIAL_STATE__;

const reducersStore = createStore(reducer, initialState,applyMiddleware(promise))

ReactDOM.render(
  <Provider store={reducersStore}>
    <Router history={browserHistory} routes={routes} />
  </Provider>
  , document.getElementById('container'));
