import React, { Component } from 'react';
import {NavBar} from './nav_bar';

export default class About extends Component {
  render () {
    return (
      <div className="container spacer">
        <NavBar/>
        <div className="row spacer">
          <div className="col-md-6">
            <p>We leverage APIs such as GoogleTrends, IBM's Alchemy and Natural Language Processing along with our inhouse tools to identify breakout trends and the companies impacted by them.</p>
            <p>Related news articles and a heatmap of US Listed Stocks are also made avalible so that a user can further research the trend they have discovered and possible investment opportunities.</p>
          </div>
          <div className="col-md-6">
            <h3>Further reading</h3>
            <p><a href="http://www.alchemyapi.com/">Alchemy API</a></p>
            <p><a href="https://en.wikipedia.org/wiki/Natural_language_processing">Natural Language Processing</a></p>
            <p><a href="https://en.wikipedia.org/wiki/Pearson_product-moment_correlation_coefficient">Pearson Correlation</a></p>
            <p><a href="https://www.google.com/trends/">Google Trends</a></p>
          </div>
        </div>
        <div className="row spacer">

        </div>
        <div className="row spacer">
          <div className="col-md-6">
            <h3>Tech Stack</h3>
            <img src="/img/TechStack-Min.png" className="center-block" width="90%" />
          </div>
          <div className="col-md-6">
            <h3>Team</h3>
            <p>We are a team of talented full stack engineers dedicated to creating flexible modern software which solves real world problems.</p>
            <div className="row text-xs-center spacer">
              <div className="col-md-6 spacer">
                <h2>Eric Mustin</h2>
                <a href="https://github.com/ericmustin"> <img src="http://cdn.flaticon.com/png/256/25231.png" width="20" /> </a>
                <a href="mailto:mustin.eric@gmail.com?Subject=Trendr"><img src="https://cdn2.iconfinder.com/data/icons/freecns-cumulus/16/519948-008_Mail-128.png" width="20" /> </a>
              </div>
              <div className="col-md-6 spacer">
                <h2>Zak Golding</h2>
                <a href="https://github.com/zakarhino"> <img src="http://cdn.flaticon.com/png/256/25231.png" width="20" /> </a>
                <a href="mailto:zak@0x7cf.com?Subject=Trend"> <img src="https://cdn2.iconfinder.com/data/icons/freecns-cumulus/16/519948-008_Mail-128.png" width="20" /> </a>
              </div>
            </div>
            <div className="row text-xs-center spacer">
              <div className="col-md-6 spacer">
                <h2>Jason Cheung</h2>
                <a href="https://github.com/JCheungX"> <img src="http://cdn.flaticon.com/png/256/25231.png" width="20" /> </a>
                <a href="mailto:jasoncheungcf@gmail.com?Subject=Trendr"><img src="https://cdn2.iconfinder.com/data/icons/freecns-cumulus/16/519948-008_Mail-128.png" width="20" /> </a>
              </div>
              <div className="col-md-6 spacer">
                <h2>Arlen Neylon</h2>
                <a href="https://github.com/aneylon"> <img src="http://cdn.flaticon.com/png/256/25231.png" width="20" /> </a>
                <a href="mailto:arlen.m.neylon@gmail.com?Subject=Trendr"><img src="https://cdn2.iconfinder.com/data/icons/freecns-cumulus/16/519948-008_Mail-128.png" width="20" /> </a>
              </div>
            </div>
            <div className="row spacer">
              <div className="text-xs-center spacer">
                <a href="https://github.com/xlnc-app/fintrendr">
                  <h3>Explore the code base on git hub</h3>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
