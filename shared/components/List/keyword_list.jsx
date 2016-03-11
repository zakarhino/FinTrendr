import React, { Component } from 'react';
import { connect } from 'react-redux';
import  { getCorrelationInfo } from '../../actions/keyword';
import { bindActionCreators} from 'redux';

class KeywordList extends Component {
  componentWillMount() {
    this.props.getCorrelationInfo(this.props.keyword.Keyword);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.keyword !== this.props.keyword) {
      if(this.props.list) {
        this.props.getCorrelationInfo(tempData);
      }
    } 
  }

  renderList() {
    return this.props.list.items.map((listItem) => {
      return (
      <li className="list-group-item" key={listItem.Keyword}>
          <span className="pull-xs-right">{listItem.Keyword}</span>
          <strong>{listItem.corr}</strong>
          
        </li>
      );
    });
  }

  render() {
     if(!this.props.list.items) {
      return <div>Loading...</div>;
      }
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
  console.log('state is',state);
  return {
    list: state.list.items,
    keyword: state.keyword
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getCorrelationInfo }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(KeywordList);
