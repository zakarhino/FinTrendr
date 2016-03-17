var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    './shared'
  ],
  output: {
    path: path.join(__dirname, 'public/dist'),
    filename: 'bundle.js'
  },
  progres : true,
  resolve: {
    modulesDirectories: ['node_modules', 'shared'],
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loaders: [ 'babel']
    }]
  }
};
