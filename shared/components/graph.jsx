import React, {Component} from 'react';
import {connect} from 'react-redux';
import {AreaChart} from '../../react-d3/index';
export class Graph extends Component {
  getDatum() {
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
    console.log('I am rerendering!!!', this.props.lineGraph);
    const {currentKeyword} = this.props;
    const {lineGraph} = this.props;
    if (!currentKeyword) {
      return (
        <div>
          Loading Grapha
        </div>
      )
    }
    const data = this.getDatum();
    //console.log(data);
    const viewBoxOject = {
      x: 0,
      y: 0,
      width: 1000,
      height: 600,
    };
    return (
      <div className='row'>
        <AreaChart data ={data} lineData={lineGraph} xAxisTickInterval={{
          unit: 'month',
          interval: 4
        }} title="Area Chart" interpolate={true} interpolationType='cardinal' xAxisTickCount={24} yAxisLabel='Value' xAxisLabel='Month'
        width='1000' height='600' viewBoxObject={viewBoxOject}/>
      </div>
    );
  }
}
function mapStateToProps(state) {
    return {currentKeyword: state.keyword.current, lineGraph: state.linegraph.linegraph};
}
export default connect(mapStateToProps)(Graph);
