import React, {Component} from 'react';
import {connect} from 'react-redux';
import {AreaChart} from '../../react-d3/index';

export class Graph extends Component {

  getDatum(j) {
    const {currentKeyword} = this.props;
    // const {currenData} = this.props;
    // console.log('get datum has logged with, ', currentData);
    let graphData = [];
    for (var item of currentKeyword.data) {
      let key = Object.keys(item)[0];
      graphData.push({x: new Date(key), y: item[key]})
    }
    return [
      {
        values: graphData,
        key: currentKeyword.Keyword,
        color: '#ff7f0e'
      }
    ];
  }

  render() {
    const {currentKeyword} = this.props;
    console.log('Graph receive render request before current Keyword')

    if (!currentKeyword) {

      return (
        <div>
          Loading Graph
        </div>
      )
    }
    console.log('Graph receive render request', currentKeyword);
    const data = this.getDatum(10);
    console.log(data);
    const viewBoxOject = {
      x: 0,
      y: 0,
      width: 2000,
      height: 400
    };
    return (
      <div>
        <AreaChart data ={data} xAxisTickInterval={{
          unit: 'month',
          interval: 5
        }} title="Area Chart" interpolate='true' yAxisLabel='Value' xAxisLabel='Month' width='100%' height={400} viewBoxObject={viewBoxOject}/>
      </div>
    );
  }

}

function mapStateToProps(state) {
  console.log('Graph receive new state update')
  console.log('currentKeywordz in graph is: ', state.keyword.current);
  // console.log('currentData in graph is: ', state.keyword.current.data);
  if(state.keyword.current){
  return {currentKeyword: state.keyword.current
          };
} else {

  return{currentKeyword: state.keyword.current};
}
}

export default connect(mapStateToProps)(Graph);
