'use strict';

import React, {Component} from 'react';
import d3 from 'd3';
import {OverlayTrigger ,Popover} from 'react-bootstrap';

module.exports = React.createClass({
  //
  // displayName: 'Cell',
  //
  // propTypes: {
  //   fill: React.PropTypes.string,
  //   width: React.PropTypes.number,
  //   height: React.PropTypes.number,
  //   label: React.PropTypes.string
  // },

  render: function() {

    var props = this.props;

    var textStyle = {
      'textAnchor': 'start',
      'alignmentBaseline' :'hanging',
      'fill': props.textColor,
      'fontSize': props.fontSize
    };
    var tooltip =(
      <Popover title="Stock Information" id="stockInfo" >Company : <strong>{props.name}</strong> <br/> Symbol : {props.label}<br/> Correlation:{props.corr.toFixed(2)} </Popover>
  );
    var t = ("translate(" + props.x + ", " + (props.y) + ")");
    var link = 'http://finance.yahoo.com/q?s='+ props.label
    return (
      <OverlayTrigger placement="top" overlay={tooltip} trigger={['hover', 'focus']} >
        <g className= 'rd3-treemap-child' transform = {t }onClick ={props.handleClick}>
          <rect className= "rd3-treemap-cell" width={props.width} height={props.height} fill={props.fill} onMouseOver={props.handleMouseOver} onMouseLeave={props.handleMouseLeave} />
          <text x={0} y={0} dy= ".35em" style= {textStyle} className="rd3-treemap-cell-text">
            {props.label}
          </text>
        </g>
      </OverlayTrigger>
    )
  }
});
