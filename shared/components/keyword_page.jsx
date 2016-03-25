import React from 'react';
import {Component} from 'react';
import Graph from './graph';
import KeywordList from './List/keyword_list';
import NewsList from './news/news_list';
import {Panel} from 'react-bootstrap';
import {NavBar} from './nav_bar';

export default class KeywordPage extends Component {

  render() {
    return (
      <div>
        <NavBar />
      <div className="spacer">
        <div className="info col-sm-12 col-md-10">
          <div className="row">
            <div className="col-sm-12 col-md-4">
              <Panel>
                <KeywordList/>
              </Panel>
            </div>
            <div className="col-sm-12 col-md-8">
              <Panel>
                <Graph/>
              </Panel>
            </div>
          </div>
        </div>
        <div className="col-sm-0 col-md-2">
          <Panel>
            <NewsList/>
          </Panel>
        </div>
      </div>
    </div>

    );
  }
}
