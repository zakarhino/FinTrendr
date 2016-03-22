import React from 'react';
import { Component } from 'react';
import HotTrends from './hot_trends';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getHotTrends} from '../actions/hotTrends';

export default class LandingPage extends Component {
  render() {
    return (
    <div>
      <div className="about-landing">
        <h1>What's trending?</h1>
        <h3>Correlations and trends made simple.</h3>
        <p>
          Culture drives business. Trendr's goal is simple: demonstrate this relationship by visualizing correlations in big data. By combining Google Search and finance data, Trendr uses the Alchemy API and Natural Language Processing to find correlations between popular Google Search terms and companies.
        </p>
      </div>
      <HotTrends />
    </div>
    );
  }
};
