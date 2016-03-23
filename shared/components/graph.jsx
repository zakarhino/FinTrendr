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
      graphData.push({x: new Date(key), y: item[key]});
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
    const {lineGraph} = this.props;
    if (!currentKeyword) {
      return (
        <div>
          Loading Grapha
        </div>
      );
    }

    if(!currentKeyword.Keyword) {
      return (
        <div>
          There appears to be an issue with Google Trends, please try another search term or wait a few moments
        </div>
      );
    }
    const data = this.getDatum();
    //console.log(data);
    const viewBoxOject = {
      x: 0,
      y: 0,
      width: 600,
      height: 500,
    };
    return (
      <div className="graph spacer">
        <AreaChart data ={data} lineData={lineGraph} xAxisTickInterval={{
          unit: 'Month',
          interval: 4
        }} title={data[0].Key} interpolate={true} interpolationType='cardinal' yAxisTickCount={3} yAxisLabel='Value'
        width='100%' height='100%' viewBoxObject={viewBoxOject}/>
      </div>
    );
  }
}
function mapStateToProps(state) {
    return {currentKeyword: state.keyword.current, lineGraph: state.linegraph.linegraph};
}
export default connect(mapStateToProps)(Graph);
