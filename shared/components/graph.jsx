import React, { Component } from 'react';
import { connect } from 'react-redux';
import {LineChart} from 'react-d3';

export class Graph extends Component {


  getDatum(j) {
    var sin = [],
      cos = [];

    for (var i = 0; i < 100; i++) {
      sin.push({ x: i, y: Math.sin(i / j) });
      cos.push({ x: i, y: .5 * Math.cos(i / j) });
    }

    return [
      {
        values: sin,
        key: 'Sine Wave',
        color: '#ff7f0e'
      },
      {
        values: cos,
        key: 'Cosine Wave',
        color: '#2ca02c'
      }
    ];
  }

  render() {
    const data = this.getDatum(10);
    const viewBoxOject =  { x: 0, y: 0, width: 500,height: 400};
    return (
      <div>
        <LineChart  data ={data} yAxisLabel= 'Month' xAxisLabel='value' width='100%'
          height={400}
          viewBoxObject= {viewBoxOject}
          />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { selectedKeyword: state.selectedKeyword };
}

export default connect(mapStateToProps)(Graph);
