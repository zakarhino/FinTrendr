import express from 'express';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { RouterContext, match, browserHistory } from 'react-router';
import createLocation from 'history/lib/createLocation';
import routes from '../shared/routes';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
<<<<<<< fe1a33a4c6dd326bc18845d8d43d68e44866ddfb
import reducer from '../shared/reducers';
=======
import {reducers} from '../shared/reducers';

// console.log("reducers", reducers);
>>>>>>> (react) clean up spelling errors

// Import Controller for api functions
import KeywordController from './controller.js';

// Import redux middleware
import promise from 'redux-promise';

export default (app) => {
  app.get('/api/keywordInfo/:keyword', KeywordController.getKeywordInfo);
  app.get('/api/correlationInfo/:keyword', KeywordController.getCorrelationInfo);
  app.get('/api/:keyword', KeywordController.getResult);


  app.use((req, res) => {
    const location = createLocation(req.url);
    // Create redux store with middleware attached
    const storeWithMiddleware = createStore(reducer, applyMiddleware(promise));
    match({ routes, location }, (err, redirection, props) => {
      if(err) {
        // console.error(err);
        return res.status(500).end('Internal server error');
      }
      if(!props) {
        return res.status(404).end('Not found');
      }
      const InitComp = (
        <Provider store={storeWithMiddleware}>
          <RouterContext {...props} />
        </Provider>
      );
      const componentHTML = renderToString(InitComp);
<<<<<<< fe1a33a4c6dd326bc18845d8d43d68e44866ddfb
      const initialState = storeWithMiddleware.getState();

=======
      // console.log(componentHTML);
>>>>>>> (react) clean up spelling errors
      const HTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Isomorphic Redux Demo</title>
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
