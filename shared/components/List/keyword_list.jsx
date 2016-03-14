import React, { Component } from 'react';
import { connect } from 'react-redux';
import  { getCorrelationInfo } from '../../actions/keyword';
import { bindActionCreators} from 'redux';
import { getValidationInfo } from '../../actions/keyword';


class KeywordList extends Component {
  componentWillMount() {
    console.log('getting correlation from mount props');
    this.props.getCorrelationInfo(this.props.keyword);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.keyword !== this.props.keyword) {
      if(this.props.list) {
        console.log('getting correlation from rec props');
        this.props.getCorrelationInfo(nextProps.keyword);
      }
    }
  }

  getValidation(keyword,listItem) {
    console.log('determining validation between ', keyword, " and ", listItem);
    this.props.getValidationInfo(keyword,listItem);
  }

  renderList() {
    console.log('list is being rendered with: ', this.props.list);
    return this.props.list.items.map((listItem) => {
      if( (listItem.Keyword === this.props.validation.listItem) && (this.props.validation.results > 0) ) {
        let divStyle = {
          color: 'green'
        };
        return (
          <li className="list-group-item" style={divStyle} key={listItem.Keyword}>
            <span className="pull-xs-right">{listItem.Keyword}</span>
            <strong>{listItem.corr}</strong>
            <strong>{this.props.validation.results}</strong>
          </li>
        );
      }
      return (
      <li className="list-group-item" key={listItem.Keyword} onClick={this.getValidation.bind(this,this.props.keyword.Keyword,listItem.Keyword)}>
          <span className="pull-xs-right">{listItem.Keyword}</span>
          <strong>{listItem.corr}</strong>
        </li>
      );
    });
  }

  render() {
     if(this.props.list.items.length === 0) {
      return <div>Loading...</div>;
      }
      console.log('we shouldnt be here until we can load items');
      console.log(this.props.list.items.length);
    return (
      <div>
        <ul>
          {this.renderList()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log('state is for keyword list',state);
  return {
    list: state.list,
    keyword: state.keyword.current,
    validation: state.validation.items
  };
}

function mapDispatchToProps(dispatch) {
  let obj = {
    getCorrelationInfo: getCorrelationInfo,
    getValidationInfo: getValidationInfo
  };
  return bindActionCreators(obj, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(KeywordList);
