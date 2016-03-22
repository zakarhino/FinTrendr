'use strict';

var React = require('react');
var shade = require('../utils').shade;
var Cell = require('./Cell');
var Label = require('./LabelCell')

module.exports = React.createClass({

  displayName: 'CellContainer',

  propTypes: {
    fill: React.PropTypes.string,
    type : React.PropTypes.string
  },

  getInitialState:function() {
    return {
      // fill is named as fill instead of initialFill to avoid
      // confusion when passing down props from top parent
      fill: this.props.fill
    };
  },

  render:function() {

    var props = this.props;
    if(props.type ==='cell'){
    return (
      React.createElement(Cell, React.__spread({},
        props,
        {fill: this.state.fill,
        handleMouseOver: props.hoverAnimation ? this._animateCell : null,
        handleMouseLeave: props.hoverAnimation ? this._restoreCell : null,
        handleClick : this._clickCell
      })
      )
    );
  }
  else {
    return (
    React.createElement(Label, React.__spread({},
      props,
      {fill: this.state.fill,
      handleMouseOver: props.hoverAnimation ? this._animateCell : null,
      handleMouseLeave: props.hoverAnimation ? this._restoreCell : null})
));
}
},
_clickCell : function(){

  window.open(
  'http://finance.yahoo.com/q?s='+this.props.label,
  '_blank'
  );
},
  _animateCell:function() {
    if (this.state.fill !=='transparent'){
      this.setState({
        fill: shade(this.state.fill,0.05)
      });
    }

  },

  _restoreCell:function() {
    this.setState({
      fill: this.props.fill
    });
  }
});
