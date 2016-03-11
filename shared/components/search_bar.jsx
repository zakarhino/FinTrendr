import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getKeyword } from '../actions/keyword';
import { Link } from 'react-router';

export class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { term: ''};
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onInputChange(event) {
    // console.log('ya bro i got someshit');
    this.setState({term: event.target.value});
  }

  onFormSubmit(event) {
    event.preventDefault();
    console.log('ya bro i got someshit from button click');
    // this.props.getKeyword(this.state.term);
    
         
          
  }

  render(){
    const { cool } = this.props;
    console.log({cool});
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

function mapStatesToProps(state) {
  return { cool: state};
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators( { getKeyword }, dispatch);
}

export default connect(mapStatesToProps,mapDispatchToProps)(SearchBar);
