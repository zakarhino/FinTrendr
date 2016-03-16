import express from 'express';
import path from 'path';
import React from 'react';
import {renderToString} from 'react-dom/server';
import {RouterContext, match, browserHistory} from 'react-router';
import createLocation from 'history/lib/createLocation';
import routes from '../shared/routes';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reducer from '../shared/reducers';

// import {reducers} from '../shared/reducers';
// console.log("reducers", reducers);
// Import Controller for api functions
import KeywordController from './controller.js';

// Import redux middleware
import promise from 'redux-promise';

//log state

export default(app) => {

  app.all('/*',function(req,res,next){
    console.log(req.method,' Request for URL ',req.url)
    next();
  });

  app.get('/api/keywordInfo/:keyword', KeywordController.getKeywordInfo);
  app.post('/api/correlationInfo', KeywordController.getCorrelationInfo);
  app.post('/api/validationInfo', KeywordController.getValidationInfo);
  app.post('/api/getStocksInfo', KeywordController.getStocksInfo);


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
        <Provider store={storeWithMiddleware}>
          <RouterContext {...props}/>
        </Provider>
      );
      const componentHTML = renderToString(InitComp);
      const initialState = storeWithMiddleware.getState();
      console.log('state is: ', initialState);

      const HTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Trendr</title>
        </head>
        <body>
          <div id="container">${componentHTML}</div>
          <script> window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
    </script>
          <script src="/dist/bundle.js"> </script>
        </body>
      </html>
      `;

      res.send(HTML);
    });
  });
};
