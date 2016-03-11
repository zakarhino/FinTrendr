import React, { Component } from 'react';
import { connect } from 'react-redux';
import  { getCorrelationInfo } from '../../actions/keyword';
import { bindActionCreators} from 'redux';

class KeywordList extends Component {
  componentWillMount() {
    this.props.getCorrelationInfo(this.props.keyword.Keyword);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.keyword.Keyword !== this.props.keyword.Keyword) {
      this.props.getCorrelationInfo(this.props.keyword.Keyword);
    }
  }

  renderItems() {
    return this.props.list.map((item) => {
      return (
        <li>
          {item}
        </li>
      );
    });
  }

  render() {
    if(!this.props.list[0]) {
      return <div>Loading...</div>;
    }
    const list = this.props.list;
    return (
      <div>
        Items:
        <ul>
          {this.renderItems()}
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
