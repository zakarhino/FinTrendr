import React from 'react';
import {Component} from 'react';
import Graph from './graph';
import KeywordList from './List/keyword_list';
import NewsList from './news/news_list';
import {Panel, OverlayTrigger, Popover, Button} from 'react-bootstrap';

export default class KeywordPage extends Component {

  render() {
    return (
      <div className="spacer">
        <div className="info col-sm-12 col-md-9 drop-shadow">
          <Panel className="infoPanel">
            <div className="row">
              <div className="col-sm-12 col-md-4">
                <div className="row">
                  <div className="col-md-11">
                    <img src="/img/Graph.png" width="20" className="pull-xs-left iconPadding" />
                    <h5>Suggested Comparisons</h5>
                  </div>
                  <OverlayTrigger className='col-md-1' trigger={["hover","focus","click"]} placement="right" overlay={
                    <Popover id="heatmapInfo" title="Learn More"><strong>Our Process: </strong> Suggested Comparisions displays Keywords in our database whose historical search volume is correlated with the user Search Term. A <strong style={{color: 'green'}}>Green</strong> text and a <img src="/img/CheckGreen.png" width="10"/> in the Verified Column indicates that the correlated Keyword has relevance to the user Search Term according to our Natural Language Processing of recent news articles.</Popover>}>
                    <img src="/img/questionmark.png" width="20" circle/>
                  </OverlayTrigger>
                </div>
                <Panel>
                  <KeywordList/>
                </Panel>
              </div>
              <div className="col-sm-12 col-md-8">
                <h5>Search Volume for <b>{this.props.params.keyword}</b>:</h5>
                  <Graph/>
              </div>
            </div>
          </Panel>
        </div>
        <div className="col-sm-0 col-md-3">
          <Panel>
            <NewsList/>
          </Panel>
        </div>
      </div>
    );
  }
}
