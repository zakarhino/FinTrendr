import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import LandingPage from './components/landing_page';
import KeywordPage from './components/keyword_page';
import KeywordList from './components/List/keyword_list';

export default (
  <Route name="app" path="/" component={App}>
    <IndexRoute component={LandingPage} />
    <Route path='keywordPage/:keyword' component={KeywordPage} />
  </Route>
);
