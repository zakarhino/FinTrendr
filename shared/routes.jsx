import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import LandingPage from './components/landing_page';
import KeywordPage from './components/keyword_page';
import TreeMap from './components/List/treemap_view';
import MainPanel from './components/main_panel';

export default (
  <Route name="app" path="/" component={App}>
    <IndexRoute component={LandingPage} />
    <Route path='k/:keyword' component={MainPanel}>
      <IndexRoute component={KeywordPage}/>
      <Route path='stock' component={TreeMap} />
    </Route>
  </Route>
);
