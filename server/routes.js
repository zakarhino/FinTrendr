import express from 'express';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { RoutingContext, match } from 'react-router';
import createLocation from 'history/lib/createLocation';
import routes from '../shared/routes';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import * as reducers from '../shared/reducers';

import KeywordController from './controller.js';

export default (app) => {
  // Keyword API route
  app.get('/api/', KeywordController.getResult);

  // app.use((req, res) => {
  //   const location = createLocation();
  // });
};