import React from 'react';
import {Component} from 'react';
import SearchBar from './search_bar';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getHotTrends} from '../actions/hotTrends';
import About from './about';

class LandingPage extends Component {
  componentWillMount() {
    this.props.getHotTrends();
  }
  renderDBTrends() {
    if (this.props.hotTrends.randomTen) {
      return this.props.hotTrends.randomTen.map((item, index) => {
        if (index < 6) {
          return (
            <div className="col-sm-4" key={index}>
              <div className='card card-block card-warning text-xs-center'>
                {item}
              </div>
            </div>
          );
        }
      });
    }
  }
  renderTweets() {
    if (this.props.hotTrends.stocks) {
      return this.props.hotTrends.stocks.map((item, index) => {
        if (index < 6) {
          return (
            <div className="col-sm-4" key={item}>
              <div className='card card-block card-info text-xs-center'>
                {item}
              </div>
            </div>
          );
        }
      });
    }
  }
  renderKeywords() {
    if (this.props.hotTrends.keywords) {
      return this.props.hotTrends.keywords.map((item, index) => {
        if (index < 6) {
          return (
            <div className="col-sm-4" key={item}>
              <div className='card card-block card-warning text-xs-center'>
                {item}
              </div>
            </div>
          );
        }
      });
    }
  }
  render() {
    if (!this.props.hotTrends) {
      return (
        <div>
          Loading...
        </div>
      );
    }
    return (
    <div>
      <div className="about-landing">
        <h1>What's trending?</h1>
        <h3>Correlations and trends made simple.</h3>
        <p>
          Culture drives business. Trendr's goal is simple: demonstrate this relationship by visualizing correlations in big data. By combining Google Trends and the historical returns of US Listed Stocks, Trendr uses the Alchemy API and Natural Language Processing to find correlations between popular Google Search terms and companies.
        </p>
      </div>
      <div className="col-md-offset-5">
      <SearchBar />
      </div>
      <div className="listLanding spacer">
          <h2>
            Trends This Hour
          </h2>
          <div className="row">
            {this.renderKeywords()}
          </div>
          <h2>
            Trends Today
          </h2>
          <div className="row">
            {this.renderTweets()}
          </div>
          <h2>
            Trends Last Month
          </h2>
          <div className="row">
            {this.renderDBTrends()}
          </div>
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
