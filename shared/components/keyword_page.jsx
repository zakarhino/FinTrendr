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
        <div className="info col-sm-12 col-md-9">
          <div className="row">
            <div className="col-sm-12 col-md-4">
              <img src="/img/Graph.png" width="20" className="pull-xs-left iconPadding" />
              <h5>Suggested Comparisons</h5>
              <Panel>
                <KeywordList/>
              </Panel>
            </div>
            <div className="col-sm-12 col-md-8">
              <h5>Search Volume for {this.props.params.keyword}</h5>
              <Panel>
                <Graph/>
              </Panel>
            </div>
          </div>
        </div>
        <div className="col-sm-0 col-md-3">
          <Panel>
            <div className="row">
            <div className="col-md-10">
              <img src="/img/News.png" width="20" className="pull-xs-left iconPadding" />
              <h5 >Related News:</h5>
            </div>
            <OverlayTrigger className='col-md-2' trigger={["hover","focus","click"]} placement="left" overlay={<Popover id="heatmapInfo" title="Learn More"><strong>Our Process: </strong> Related News displays recent news articles and for the keyword and a selected search term. A <strong style={{'backgroundColor': '#e6ffe6"', color: 'white'}}>Green</strong> shading indicates that article is relevant to both the user keyword and the selected search term.</Popover>}>
                <img src="/img/questionmark.png" width="30" circle/>
            </OverlayTrigger>
            </div>
            <NewsList/>
          </Panel>
        </div>
      </div>

    );
  }
}
