import React, {Component} from 'react';
import {connect} from 'react-redux';
import {AreaChart} from 'react-d3';

export class Graph extends Component {

  getDatum(j) {
    const {currentKeyword} = this.props;
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
    console.log('Graph receive render request')
    const data = this.getDatum(10);
    console.log(data);
    const viewBoxOject = {
      x: 0,
      y: 0,
      width: 700,
      height: 400
    };
    return (
      <div>
        <AreaChart data ={data} xAxisTickInterval={{
          unit: 'month',
          interval: 5
        }} title="Area Chart" yAxisLabel='Value' xAxisLabel='Month' width='100%' height={400} viewBoxObject={viewBoxOject}/>
      </div>
    );
  }

}

function mapStateToProps(state) {
  console.log('Graph receive new state update')
  return {currentKeyword: state.keyword.current};
}

export default connect(mapStateToProps)(Graph);
