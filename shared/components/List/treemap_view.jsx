import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Treemap} from '../../../react-d3/index';
import {bindActionCreators} from 'redux';
import {getStocksInfo} from '../../actions/stocks';
import d3 from 'd3';
import {OverlayTrigger, Popover, Button} from 'react-bootstrap';
class TreeMap extends Component {
  componentWillMount() {
    if (this.props.keyword&&!this.props.stocks.children) {
      this.props.getStocksInfo(this.props.keyword);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.keyword !== this.props.keyword) {
      if (nextProps.keyword) {
        this.props.getStocksInfo(nextProps.keyword);
      }
    }
  }
  convertToGraphData(data) {
    let result = []
    for (let item in data) {
      let temp = [];
      for (let i = 0; i < data[item].length; i++) {
        temp.push(data[item][i]);
      }
      result.push(temp);
    }
    return result;
  }
  render() {
    let {stocks} = this.props;
    //let graphData = this.convertToGraphData(stocks);
    let colorFunction = d3.scale.linear().domain([-1, 0, 1]).range(['red', 'white', 'green']);
    let colorAccessor = function(d) {
      if (d.parent && d.parent.name === 'negative') {
        return -d.value;
      } else {
        return d.value;
      };
    }
    const viewBoxOject = {
      x: 0,
      y: 0,
      width: 700,
      height: 500,
    };

    return (
      <div>
        <h2>"Heat Map of Correlations Between "+this.props.keyword.Keyword+" and S&P 500 Components"</h2>
      <div className="drop-shadow container spacer">
        <div className="row">
          <div className="col-md-offset-10">
            <OverlayTrigger trigger={["hover","focus","click"]} placement="left" overlay={<Popover id="heatmapInfo" title="Learn More"><strong>Our Process: </strong> The heatmap visualizes the Pearson Correlation Coefficient between the returns of each stock in the S&P 500 (organized by sector), and the historical search volume data of your keyword. <strong style={{'background-color': 'green', color: 'white'}}>Green</strong> indicates a positive correlation and <strong style={{'background-color': 'red', color: 'white'}}>Red</strong> indicates a negative correlation.  Brightness increases as correlation approaches -1/1. For reference, typically .4-.6 is moderate, .6-.8 is strong, and .8-1.0 is a very strong correlation.  Mouse over a box to see more details, and click to open up a Yahoo Finance window for the stock. Enjoy!</Popover>}>
              <Button bsStyle="default">Want to Learn More?</Button>
            </OverlayTrigger>
          </div>
        </div>
        <Treemap data={stocks} colors={colorFunction} colorAccessor={colorAccessor} width={1000} height={550} textColor="#484848" fontSize="12px" hoverAnimation={true}/>
      </div>
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
