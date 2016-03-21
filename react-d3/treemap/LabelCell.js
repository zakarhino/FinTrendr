'use strict';

var React = require('react');
var d3 = require('d3');


module.exports = React.createClass({

  displayName: 'LabelCell',

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

    var t = ("translate(" + props.x + ", " + (props.y) + "  )");

     return (
      React.createElement("g", {transform: t},

        React.createElement("rect", {
          className: "rd3-treemap-label",
          width: props.width,
          height: props.height,
          fill: props.fill,
          onMouseOver: props.handleMouseOver,
          onMouseLeave: props.handleMouseLeave}
        ),React.createElement("text", {
          x: 0,
          y: 0,
          dy: ".35em",
          style: textStyle,
          className: "rd3-treemap-cell-text",
          onMouseOver: props.handleMouseOver,
          onMouseLeave: props.handleMouseLeave
        },
          props.label
        ),

      )
    );
  }
});
