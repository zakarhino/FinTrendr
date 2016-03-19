'use strict';
var React = require('react');
var d3 = require('d3');
var CellContainer = require('./CellContainer');
module.exports = React.createClass({
  displayName: 'DataSeries',
  propTypes: {
    data: React.PropTypes.object,
    colors: React.PropTypes.func,
    colorAccessor: React.PropTypes.func,
    width: React.PropTypes.number,
    height: React.PropTypes.number
  },
  getDefaultProps: function() {
    return {
      data: [],
      colors: d3.scale.category20c(),
      colorAccessor: function(d, idx) {
        return idx;
      }
    };
  },
  render: function() {
    var props = this.props;
    var treemap = d3.layout.treemap()
    // make sure calculation loop through all objects inside array
      .size([props.width, props.height])
      .sticky(true)
      .padding(function(d) {
      if (d.children) {
        if (d.name !== 'positive' && d.name !== 'negative' && d.name !== 'stock') {
          return [20, 3, 3, 3]
        } else {
          return 0
        }
      } else {
        return [1, 1, 1, 1];
      }
    }).value(function(d) {
      return d.value;
    });
    var tree = treemap(props.data);
    var nodes = treemap.nodes(props.data);
    var children = nodes.filter(function(d) {
      return !d.children;
    })
    var parents = nodes.filter(function(d) {
      return d.children && (d.name !== 'positive' && d.name !== 'negative' && d.name !== 'stock');
    })
    var nodes = treemap(props.data);
    var parents = parents.map(function(node) {
      //node.dy+=20;
      return (React.createElement(CellContainer, {
        key: node.name,
        x: node.x,
        y: node.y,
        width: node.dx,
        height: node.dy,
        fill: 'transparent',
        label: node.name,
        fontSize: props.fontSize,
        textColor: props.textColor,
        hoverAnimation: props.hoverAnimation,
        type: 'label'
      }));
    }, this);
    var cells = children.map(function(node) {
      return (React.createElement(CellContainer, {
        key: node.label,
        x: node.x,
        y: node.y,
        width: node.dx,
        height: node.dy,
        fill: props.colors(props.colorAccessor(node)),
        label: node.label,
        fontSize: props.fontSize,
        textColor: props.textColor,
        hoverAnimation: props.hoverAnimation,
        type: 'cell'
      }));
    }, this);
    var final = parents.concat(cells);
    return (React.createElement("g", {
      transform: props.transform,
      className: "treemap"
    }, final));
  }
});
