import express from 'express';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { RouterContext, match, browserHistory } from 'react-router';
import createLocation from 'history/lib/createLocation';
import routes from '../shared/routes';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../shared/reducers';

// import {reducers} from '../shared/reducers';
// console.log("reducers", reducers);
// Import Controller for api functions
import KeywordController from './controller.js';
import HotTrendsController from './hotTrendsController.js';
import SaveKeywordController from './saveKeywordController.js';
import GetAlchemyInfo from './alchemyController.js';


// Import redux middleware
import promise from 'redux-promise';

//log state

export default (app) => {

  app.all('/*', function(req, res, next) {
    console.log(req.method, ' Request for URL ', req.url);
    next();
  });

  app.get('/api/keywordInfo/:keyword', KeywordController.getKeywordInfo);
  app.post('/api/correlationInfo', KeywordController.getCorrelationInfo);
  app.post('/api/getStocksInfo', KeywordController.getStocksInfo);
  app.get('/api/getHotTrendsInfo', HotTrendsController.getHotTrendsInfo);
  app.get('/api/getNews/:keyword', KeywordController.getNews);
  app.post('/api/saveKeywordInfo/', SaveKeywordController.saveKeywordInfo);
  app.post('/api/getAlchemyInfo/', GetAlchemyInfo.getAlchemyInfo);

  app.use((req, res) => {
    const location = createLocation(req.url);
    // Create redux store with middleware attached
    const storeWithMiddleware = createStore(reducer, applyMiddleware(promise));

    match({
      routes,
      location
    }, (err, redirection, props) => {
      if (err) {
        // console.error(err);
        return res
          .status(500)
          .end('Internal server error');
      }
      if (!props) {
        return res
          .status(404)
          .end('Not found');
      }
      const InitComp = (
        <Provider store = { storeWithMiddleware }>
          <RouterContext {...props} />
        </Provider>
      );
      const componentHTML = renderToString(InitComp);
      const initialState = storeWithMiddleware.getState();
      console.log('state is: ', initialState);

      const HTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8"></meta>
          <title>Trendr</title>
          <link href='https://fonts.googleapis.com/css?family=Jockey+One' rel='stylesheet' type='text/css'/>
          <link href='https://fonts.googleapis.com/css?family=Teko:400,600' rel='stylesheet' type='text/css'/>
          <link href='https://fonts.googleapis.com/css?family=Squada+One' rel='stylesheet' type='text/css'/>
          <link href='https://fonts.googleapis.com/css?family=Homenaje' rel='stylesheet' type='text/css'/>

          <link rel="icon" href="/TrendrFavicon2.ico" type="image/x-icon"/>

          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.2/css/bootstrap.min.css" integrity="sha384-y3tfxAZXuh4HwSYylfB+J125MxIs6mR5FOHamPBG064zB+AFeWH94NdvaCBm8qnd" crossorigin="anonymous" />
          <link href="/styles/style.css" rel="stylesheet" />
          <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">
        </head>
        <body>
          <div id="container" class="wrapper">
            ${componentHTML}
          </div>
          <script> window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}</script>
          <script src="/dist/bundle.js"> </script>
          <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
          <script src="/dist/tether.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.2/js/bootstrap.min.js" integrity="sha384-vZ2WRJMwsjRMW/8U7i6PWi6AlO1L79snBrmgiDpgIWJ82z8eA5lenwvxbMV1PAh7" crossorigin="anonymous"></script>
        </body>
      </html>
      `;

      res.send(HTML);
    });
  });
};
