import React from 'react';
import {Component} from 'react';
import Graph from './graph';
import KeywordList from './List/keyword_list';
import NewsList from './news/news_list';
import {Panel} from 'react-bootstrap';

export default class KeywordPage extends Component {

  render() {
    return (

      <div className="spacer">
        <div className="info col-sm-12 col-md-10">
          <div className="row">
            <div className="col-sm-12 col-md-4">
              <img src="/img/Graph.png" width="20" className="pull-xs-left iconPadding" />
              <h4 className="spacer">Suggested Comparisons</h4>
              <Panel>
                <KeywordList/>
              </Panel>
            </div>
            <div className="col-sm-12 col-md-8">
              <span><h4>Search Volume for {this.props.params.keyword}</h4></span>
              <Panel>
                <Graph/>
              </Panel>
            </div>
          </div>
        </div>
        <div className="col-sm-0 col-md-2">
          <Panel>
            <img src="/img/News.png" width="20" className="pull-xs-left iconPadding" />
            <h4>Related News:</h4>
            <NewsList/>
          </Panel>
        </div>
      </div>


    );
  }
}
