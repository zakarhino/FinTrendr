import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import LandingPage from './components/landing_page';
import KeywordPage from './components/keyword_page';

export default (
  <Route name="app" path="/" component={App}>
    <IndexRoute component={LandingPage} />
    <Route path='keywordPage' component={KeywordPage} />
  </Route>
);