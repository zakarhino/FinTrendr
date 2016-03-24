import React from 'react';
import {Component} from 'react';
import SearchBar from './search_bar';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import HotTrends from './hot_trends';
import { getHotTrends } from '../actions/hotTrends';
import About from './about';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class LandingPage extends Component {
  constructor(props) {
    super(props);

    this.state = { currentTrend: '' };
    this.generateWord = this.generateWord.bind(this);
  }

  componentWillMount() {
    var that = this;
    this.props.getHotTrends();
    setInterval(function() {
      that.generateWord();
    }, 4500);
  }

  generateWord() {
    if(this.props.hotTrends) {
      this.setState({currentTrend: this.props.hotTrends.keywords[Math.floor(Math.random() * this.props.hotTrends.keywords.length)]});
    }
  }

  render() {
    return (
    <div>
      <div className="about-landing">
        <span className="col-sm-6 left-banner"><h1>What's trending </h1></span><span className="col-sm-6 right-banner"><h1><u>{this.state.currentTrend}</u>?</h1></span>
        <h3>Correlations and trends made simple.</h3>
        <p>
          Culture drives business. Trendr's goal is simple: demonstrate this relationship by visualizing correlations in big data. By combining Google Trends and the historical returns of US Listed Stocks, Trendr uses the Alchemy API and Natural Language Processing to find correlations between popular Google Search terms and companies.
        </p>
      </div>
      <div className="col-md-offset-5">
      <SearchBar />
      </div>
      <div className="listLanding spacer">
        <HotTrends />
      </div>
      <About />
    </div>
    );
  }
}

function mapStatesToProps(state) {
  return {hotTrends: state.hotTrends.items};
}

export default connect(mapStatesToProps, {getHotTrends})(LandingPage);
