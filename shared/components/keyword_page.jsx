import React from 'react';
import {Component} from 'react';
import Graph from './graph';
import {getKeyword} from '../actions/keyword';
import KeywordList from './List/keyword_list';
import NewsList from './news/news_list';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import NavBar from './nav_bar';
import TweetList from './twitter/tweet_list';
import HotTrends from './hot_trends';
import TreeMapView from './List/treemap_view';
import {Panel} from 'react-bootstrap';
import {MainPanel} from './main_panel';

class KeywordPage extends Component {

  constructor(props) {
    super(props);
    //this.setState({keyword:this.props.params.keyword})
    console.log('In Keyword Page setting', this.state, this.props);
  }
  componentWillMount() {
    // if (this.props.params.keyword !== this.state.keyword) {
    //   this.props.getKeyword(this.props.params.keyword);
    // }
    console.log('component will mount brah');
  }
    componentWillReceiveProps(nextProps){
      console.log('did i get anything');
    }

  render() {
    return (
      <div>
        <div className="info col-sm-12 col-md-10">
          <div className="row">
            <div className="col-sm-12 col-md-3">
              <Panel>
                <KeywordList/>
              </Panel>
            </div>
            <div className="col-sm-12 col-md-9">
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
    );
  }
}
function mapStatesToProps(state) {
  return {currentKeyword: state.keyword.current};
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getKeyword
  }, dispatch);
}
export default connect(mapStatesToProps, mapDispatchToProps)(KeywordPage);
