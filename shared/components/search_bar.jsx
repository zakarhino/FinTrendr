import React from 'react';
import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getKeyword } from '../actions/keyword';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import { Input } from 'react-bootstrap';
import { ButtonInput } from 'react-bootstrap';

import { Button } from 'react-bootstrap';

class SearchBar extends Component {
   static contextTypes = {
    router: PropTypes.object,
    history: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = { term: '' };
    this.onInputChange = this.onInputChange.bind(this);
    // this.onFormSubmit = this.onFormSubmit.bind(this);
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
    let path = `k/${this.state.term}`;
    let button = <Button className="btn btn-default" id='search-button'><Link to={path} {...this.props} id="search-button-link"> Go Get Trends!</Link></Button>;
    return (
    <div className="row">
      <div className="col-lg-4">
        <form>
          <Input type="text" className="form-control" placeholder="input a keyword" id="inputBox" value={this.state.term} onChange={this.onInputChange} onKeyPress={this.handleKeyPress} buttonAfter={button} />
          </form>
        </div>
    </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getKeyword }, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchBar);
