import React, { Component } from 'react';
import { connect } from 'react-redux';
import  { getCorrelationInfo } from '../../actions/keyword';
import { bindActionCreators} from 'redux';

class KeywordList extends Component {
  componentWillMount() {
    this.props.getCorrelationInfo(this.props.keyword);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.keyword !== this.props.keyword) {
      if(this.props.list) {
        this.props.getCorrelationInfo(nextProps.keyword);
      }
    }
  }

  renderList() {
    return this.props.list.items.map((listItem) => {
      return (
      <li className="list-group-item" key={listItem.keyword}>
          <span className="pull-xs-right">{listItem.keyword}</span>
          <strong>{listItem.correlation}</strong>
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
    list: state.list,
    keyword: state.keyword.current
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getCorrelationInfo }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(KeywordList);
