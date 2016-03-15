import React, {Component} from 'react';
import {connect} from 'react-redux';
import {AreaChart} from 'react-d3';
export class Graph extends Component {
  componentWillMount(){
    console.log('treemap loaded');
  }
  render() {
    return (
      <div>
        Graph ish 
      </div>
    );
  }
}
function mapStateToProps(state) {
  console.log('Graph receive new state update')
  return {currentKeyword: state.keyword.current}
}

  export default connect(mapStateToProps)(Graph);
