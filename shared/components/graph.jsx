import React, { Component } from 'react';
import { connect } from 'react-redux';

export class Graph extends Component {

  renderGraph() {

  }

  render() {
    return (
      <div>
        <div> </div>
        <div> </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {selectedKeyword: state.selectedKeyword};
}

export default connect(mapStateToProps)(Graph);
