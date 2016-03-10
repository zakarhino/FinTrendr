import express from 'express';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { RoutingContext, match, browserHistory } from 'react-router';
import createLocation from 'history/lib/createLocation';
import routes from '../shared/routes';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducers from '../shared/reducers';

console.log("reducers", reducers);

// Import Controller for api functions
import KeywordController from './controller.js';

// Import redux middleware
import promise from 'redux-promise';

export default (app) => {
  // Keyword API route
  app.get('/api/', KeywordController.getResult);

  app.use((req, res) => {
    const location = createLocation();
    // Create redux store with middleware attached
    const storeCreator = applyMiddleware(promise)(createStore);
    
    match({ routes, location }, (err, redirection, props) => {
      if(err) {
        console.error(err);
        return res.status(500).end('Internal server error');
      }
      if(!props) {
        return res.status(404).end('Not found');
      }

      const InitComp = (
        <Provider store={storeCreator(reducers)}>
          <RoutingContext {...props} />
        </Provider>
      );
      const componentHTML = renderToString(InitComp);
      console.log(componentHTML);
      const HTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Isomorphic Redux Demo</title>
        </head>
        <body>
          <div id="react-view">${componentHTML}</div>
        </body>
      </html>
      `;
      res.end(HTML);
    });
  });
};