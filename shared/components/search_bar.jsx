import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getKeyword } from '../actions/keyword';


export class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { term: ''};
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onInputChange(event) {
    console.log('ya bro i got someshit');
    this.setState({term: event.target.value});
  }

  onFormSubmit(event) {
    event.preventDefault();

    console.log('ya bro i got someshit from button click');
    this.props.getKeyword(this.state.term);
  }

  render(){
    return (
    <div>
      <input
        type="text"
        id="keyword"
        placeholder = "input a keyword"
        value={this.state.term}
        onChange={this.onInputChange} />
      <button
        type="button"
        className ="btn btn-primary"
        onClick={this.onFormSubmit}
        id='buttonSubmit'>
          submit
      </button>
    </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators( { getKeyword }, dispatch);
}

export default connect(null,mapDispatchToProps)(SearchBar);
