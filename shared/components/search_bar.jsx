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
<<<<<<< HEAD
    console.log('ya bro i got someshit');
=======
    console.log('change');
>>>>>>> (react) update to keyword list
    this.setState({term: event.target.value});
  }

  onFormSubmit(event) {
    event.preventDefault();
<<<<<<< HEAD

    console.log('ya bro i got someshit from button click');
=======
    console.log('yea');
>>>>>>> (react) update to keyword list
    this.props.getKeyword(this.state.term);
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
      <button
        type="submit"
        className ="btn btn-primary"
<<<<<<< HEAD
        onClick={this.onFormSubmit}
        id='buttonSubmit'>
=======
        id='buttonSubmit'> 
>>>>>>> (react) update to keyword list
          submit
      </button>
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

<<<<<<< HEAD
export default connect(null,mapDispatchToProps)(SearchBar);
=======
export default connect(mapStatesToProps,mapDispatchToProps)(SearchBar);
>>>>>>> (react) update to keyword list
