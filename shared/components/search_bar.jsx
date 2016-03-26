import React from 'react';
import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getKeyword } from '../actions/keyword';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import { Input, Button } from 'react-bootstrap';
import { ButtonInput } from 'react-bootstrap';

class SearchBar extends Component {
   static contextTypes = {
    router: PropTypes.object,
    history: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = { term: '' };
    this.onInputChange = this.onInputChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
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

  render(){

    let path = `/k/${this.state.term}`;
    let button = <Link to={path} {...this.props} id="search-button-link"><Button bsStyle="primary" bsSize="small" id='search-button'>Get Trends!</Button></Link>;
    return (
        <Input type="text" bsSize="small" placeholder="input a keyword" id="inputBox" value={this.state.term} onChange={this.onInputChange} onKeyPress={this.handleKeyPress} buttonAfter={button} />    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getKeyword }, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchBar);
