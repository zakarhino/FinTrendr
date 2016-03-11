import React from 'react';
import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getKeyword } from '../actions/keyword';
import { Link } from 'react-router';

export class SearchBar extends Component {

  static contextTypes = {
    router: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = { term: '' };
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onInputChange(event) {
    this.setState({term: event.target.value});
  }

  onFormSubmit(event) {
    event.preventDefault();
    console.log('yea');
    this.props.getKeyword(this.state.term);
    this.context.router.push(`keywordPage/${this.state.term}`);
  }

  render(){
    return (
    <form onSubmit={this.onFormSubmit}>
      <input
        placeholder = "input a keyword"
        value={this.state.term}
        onChange={this.onInputChange} />
      <button
        type="submit"
        className ="btn btn-primary"
        id='buttonSubmit'>
        submit
      </button>
    </form>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getKeyword }, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchBar);
