import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getCorrelationInfo} from '../../actions/keyword';
import {bindActionCreators} from 'redux';
// import { getValidationInfo } from '../../actions/keyword';
import {getHotTrends} from '../../actions/hotTrends';
import {saveKeywordInfo} from '../../actions/saveKeyword';
import {putToGraph,removeGraph} from '../../actions/linegraph';
import Loading from '../loading';

class KeywordList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addedKeyword: ''
    };
    this.fetchKeyword = this.fetchKeyword.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }
  componentWillMount() {
    if (this.props.keyword&&this.props.list.items.length===0) {
      this.props.getCorrelationInfo(this.props.keyword);
      this.setState({addedKeyword: ''});
      // {this.saveNewKeywordInfo('america')}
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.keyword !== this.props.keyword) {
      if (nextProps.keyword) {
        this.props.getCorrelationInfo(nextProps.keyword);
        this.setState({addedKeyword: ''});
      }
    }
  }
  // getValidation(keyword, listItem) {
  //   this.props.getValidationInfo(keyword, listItem);
  // }
  fetchKeyword(event) {
      event.preventDefault();
      this.props.saveKeywordInfo(this.state.addedKeyword, this.props.keyword);
  }

  onInputChange(event) {
    event.preventDefault();
    this.setState({addedKeyword: event.target.value});
  }

  putToGraph(item)
  {
    if ((this.props.lineGraph.length>0) && (this.props.lineGraph[0].key  === item.Keyword))
    {
      this.props.removeGraph();
    }
    else {
      this.props.putToGraph(item);
    }
  }

  renderList() {
    return this.props.list.items.map((listItem) => {
      let color = 'black';
      let picLink = "/img/NoRed.png";

      if (listItem.rel) {
        color = 'green';
        picLink = "/img/CheckGreen.png";
        };
      let divStyle = {
          color: color
        };
        return (
          <tr style={divStyle} key={`keyword-${listItem.Keyword}`} onClick={this.putToGraph.bind(this,listItem)}>
            <td>{Caps(listItem.Keyword)}</td>
            <td>{((listItem.corr * 100).toFixed()).toString() + "%" }</td>
            <td><img className="veriImage" src={picLink} width="20" height="20"/></td>
          </tr>
        );
        //<td><img className="veriImage" src={picLink}/></td>
      // onClick={this.getValidation.bind(this,this.props.keyword.Keyword,listItem.Keyword)}
    });
  }
  // renderStocks() {
  //   if(this.props.stocks.length > 0) {
  //   return this.props.stocks.map((stockItem) => {
  //       return (
  //         <li className="list-group-item" key={stockItem.Keyword}>
  //           <span className="pull-xs-left">{stockItem.Keyword}</span>
  //           <strong>{listItem.corr}</strong>
  //         </li>
  //       );
  //     });
  //   }
  // }
  render() {
    const {list} = this.props;
    if (!list || !list.items || list.items.length === 0) {
      return (
        <div className="text-xs-center spacer">
          <Loading />
        </div>
      );
    }

    // <div className="input-group" >
    //   <input id="newKeywordBox" className="form-controler" placeholder="new comparison" value={this.state.addedKeyword} onChange={this.onInputChange}/>
    //   <span className="input-group-btn">
    //     <button className="btn btn-default" type="button" onClick={this.fetchKeyword} >Add</button>
    //   </span>
    // </div>

    return (
      <div className="keywordList">
        <hr/>
        <div className="input-group input-group-sm">
          <input id="newKeywordBox" type="text" className="form-control" placeholder="New Comparison" value={this.state.addedKeyword} onChange={this.onInputChange}/>
          <span className="input-group-btn">
            <button className="btn btn-default" type="button" onClick={this.fetchKeyword}>Add</button>
          </span>
        </div>
        <p className="font-weight-bold text-xs-center spacer">Select to visualize comparison</p>
        <div className="table-responsive">
          <table className="table table-hover">
          <thead>
            <tr>
                <th>Keyword</th>
                <th>Correlation</th>
                <th>Verified</th>
              </tr>
            </thead>
            <tbody>
              {this.renderList()}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

function Caps(str){
  var output = "";

  for ( var i = 0; i < str.length; i++ ) {
    if(i === 0){
      output += (str[i]).toUpperCase();
    } else if (str[i] === ' ') {
        output += ' ';
        i++;
        output += (str[i]).toUpperCase();
    } else {
      output += (str[i]);
    }
  }

  return output;
}

function mapStateToProps(state) {
  return {list: state.list, keyword: state.keyword.current, lineGraph : state.linegraph.linegraph};
}
function mapDispatchToProps(dispatch) {
  let obj = {
    getCorrelationInfo: getCorrelationInfo,
    getHotTrends: getHotTrends,
    saveKeywordInfo: saveKeywordInfo,
    putToGraph : putToGraph,
    removeGraph : removeGraph
  };
  return bindActionCreators(obj, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(KeywordList);
