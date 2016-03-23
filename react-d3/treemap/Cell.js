'use strict';

var React = require('react');
var d3 = require('d3');


module.exports = React.createClass({

  displayName: 'Cell',

  propTypes: {
    fill: React.PropTypes.string,
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    label: React.PropTypes.string
  },

  render:function() {

    var props = this.props;

    var textStyle = {
      'textAnchor': 'start',
      'alignment-baseline' :'hanging',
      'fill': props.textColor,
      'fontSize': props.fontSize
    };

    var t = ("translate(" + props.x + ", " + (props.y) + ")");
    var link = 'http://finance.yahoo.com/q?s='+ props.label
    return (
      React.createElement("g", { className: 'rd3-treemap-child' , transform: t ,onClick:props.handleClick},
        React.createElement("rect", {
          className: "rd3-treemap-cell",
          width: props.width,
          height: props.height,
          fill: props.fill,
          onMouseOver: props.handleMouseOver,
          onMouseLeave: props.handleMouseLeave},

        ),
        React.createElement("text", {
          x: 0,
          y: 0,
          dy: ".35em",
          style: textStyle,
          className: "rd3-treemap-cell-text"
        },
          props.label
        )
      )
    );
  }
});
