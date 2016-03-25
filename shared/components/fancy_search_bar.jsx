import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getKeyword } from '../actions/keyword';
import { getHotTrends } from '../actions/hotTrends';
import { Link, browserHistory } from 'react-router';
import { Input, ButtonInput, OverlayTrigger, Popover, Panel, ListGroup, ListGroupItem } from 'react-bootstrap';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class FancySearchBar extends Component {
   static contextTypes = {
    router: PropTypes.object,
    history: PropTypes.object
  }

  constructor(props) {
    super(props);

    this.state = { currentTrend: 'Trendr', term: '', intervalID: null };
    this.generateWord = this.generateWord.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentWillMount() {
    let that = this;
    this.props.getHotTrends();
    var intervalID = setInterval(function() {
      that.generateWord();
    }, 4500);
    this.setState({...this.state, intervalID: intervalID});
  }

  componentWillUnmount() {
    if(this.state.intervalID) {
      clearInterval(this.state.intervalID);
    }
  }

  generateWord() {
    if(this.props.hotTrends) {
      var types = ['keywords', 'stocks', 'randomTen'];
      var randomType = types[Math.floor(Math.random() * types.length)];
      var randomWord = this.props.hotTrends[randomType][Math.floor(Math.random() * this.props.hotTrends[randomType].length)];
      this.setState({...this.state, currentTrend: randomWord});
    }
  }

  onInputChange(event) {
    this.setState({term: event.target.value});
  }

  // onFormSubmit(e) {
  //   e.preventDefault();
  //   `/k/${this.state.term}`);
  // }

  handleKeyPress(e) {
    if(e.key === 'Enter') {
      document.getElementById('search-button-link').click();
    }
  }

  render() {
    let path = `/k/${this.state.term ? this.state.term : this.state.currentTrend}`;
    //<button className="fancy-button" id='search-button'><Link to={path} {...this.props} id="search-button-link"><span className="icon"><i className="fa fa-search fa-2x"></i></span></Link></button>
    return (
    <div className="fancy-box drop-shadow">
      <div className="fancy-search">
        <input type="text" className="fancy-input" placeholder={this.state.currentTrend} id="inputBox" value={this.state.term} onChange={this.onInputChange} onKeyPress={this.handleKeyPress} />
        <Link to={path} {...this.props} id="search-button-link"><span className="icon"><i className="fa fa-search fa-2x"></i></span></Link>
      </div>
    </div>
    );
  }
}

function mapStatesToProps(state) {
  return {hotTrends: state.hotTrends.items};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getKeyword, getHotTrends }, dispatch);
}

export default connect(mapStatesToProps, mapDispatchToProps)(FancySearchBar);
