import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getKeyword } from '../actions/keyword';
import { Link } from 'react-router';

export class SearchBar extends Component {
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
    this.props.getKeyword(this.state.term);
  }

  render(){
    return (
    <form onSubmit={this.onFormSubmit}>
      <input
        placeholder = "input a keyword"
        value={this.state.term}
        onChange={this.onInputChange} />
      <Link to={`keywordPage/${this.state.term}`}>
      <button
        type="submit"
        className ="btn btn-primary"
        id='buttonSubmit'>
        submit
      </button>
      </Link>
    </form>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getKeyword }, dispatch);
}

export default connect(null,mapDispatchToProps)(SearchBar);
