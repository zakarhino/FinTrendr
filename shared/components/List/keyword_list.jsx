import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getCorrelationInfo} from '../../actions/keyword';
import {bindActionCreators} from 'redux';
// import { getValidationInfo } from '../../actions/keyword';
import {getHotTrends} from '../../actions/hotTrends';
import {saveKeywordInfo} from '../../actions/saveKeyword'
import {putToGraph} from '../../actions/linegraph';

class KeywordList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addedKeyword: ''
    };
    this.fetchKeyword = this.fetchKeyword.bind(this)
    this.onInputChange = this.onInputChange.bind(this);
  }
  componentWillMount() {
    this.props.getHotTrends();
    if (this.props.keyword) {
      this.props.getCorrelationInfo(this.props.keyword);
      // {this.saveNewKeywordInfo('america')}
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.keyword !== this.props.keyword) {
      if (nextProps.keyword) {
        this.props.getCorrelationInfo(nextProps.keyword);
      }
    }
  }
  // getValidation(keyword, listItem) {
  //   this.props.getValidationInfo(keyword, listItem);
  // }
  fetchKeyword(event) {
      event.preventDefault();
      console.log('came once',this.state.addedKeyword);
      this.props.saveKeywordInfo(this.state.addedKeyword, this.props.keyword);
  }

  onInputChange(event) {
    event.preventDefault();
    this.setState({addedKeyword: event.target.value});
  }

  putToGraph(item)
  {
    console.log(item);
    this.props.putToGraph(item);
  }

  renderList() {
    return this.props.list.items.map((listItem) => {
      let color = 'black';
      if (listItem.rel) {
        color = 'green';
        };
      let divStyle = {
          color: color
        }
        return (
          <li className="list-group-item" style={divStyle} key={listItem.Keyword} onClick={this.putToGraph.bind(this,listItem)}>
            <span className="pull-xs-right">{listItem.Keyword}</span>
            <strong>{listItem.corr}</strong>
          </li>
        );
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
      return <div>Loading...</div>;
    }
    return (
      <div>
        Suggested Ideas
        <form onSubmit={this.fetchKeyword}>
            <input placeholder="input a keyword" value={this.state.addedKeyword} onChange={this.onInputChange}/>
              <button type="submit">Add new Keyword</button>
          </form>
        <ul>
          {this.renderList()}
        </ul>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {list: state.list, keyword: state.keyword.current};
}
function mapDispatchToProps(dispatch) {
  let obj = {
    getCorrelationInfo: getCorrelationInfo,
    getHotTrends: getHotTrends,
    saveKeywordInfo: saveKeywordInfo,
    putToGraph : putToGraph
  };
  return bindActionCreators(obj, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(KeywordList);
