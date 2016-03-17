import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Treemap} from '../../../react-d3/index';
import {bindActionCreators} from 'redux';
import {getStocksInfo} from '../../actions/stocks';

class TreeMap extends Component {
  componentWillMount() {
    if (this.props.keyword) {
      console.log('Treemap is Mounting');
      this
        .props
        .getStocksInfo(this.props.keyword);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.keyword !== this.props.keyword) {
      if (nextProps.keyword) {
        this
          .props
          .getStocksInfo(nextProps.keyword);
      }
    }
  }
  convertToGraphData(data) {
    console.log(data);
    let result = []
    for (let item in data) {
      console.log(item);
      let temp = [];
      for (let i = 0; i < data[item].length; i++) {
        temp.push(data[item][i]);
      }
      result.push(temp);
    }
    console.log('converting data', result);
    return result;
  }
  render() {
    let {stocks} = this.props;
    //let graphData = this.convertToGraphData(stocks);
    let colorFunction = d3
      .scale
      .linear()
      .domain([-1, 0, 1])
      .range(['red', 'white', 'green']);
    let colorAccessor = function(d) {
      console.log(d.parent)
      if (d.parent && d.parent.name === 'negative') {
        return -d.value;
      } else {
        return d.value;
      };
    }

    return (
      <div>
        <Treemap data={stocks} colors={colorFunction} colorAccessor={colorAccessor} width={1000} height={300} textColor="#484848" fontSize="12px" title="Treemap" hoverAnimation={true}/>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {keyword: state.keyword.current, stocks: state.stocks.items};
}
function mapDispatchToProps(dispatch) {
  let obj = {
    getStocksInfo: getStocksInfo
  };
  return bindActionCreators(obj, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(TreeMap);
