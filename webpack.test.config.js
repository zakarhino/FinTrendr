var path = require('path');
var webpack = require('webpack');
var fs = require('fs');

var ROOT_PATH = path.resolve(__dirname);
//setup asssets path
var assetsPath = path.resolve(__dirname,'./public/dist');
var host = (process.env.HOST|| 'localhost');
var port = (+process.env.PORT +1) || 3001;

//load babelrc for server side setup
var babelrc = fs.readFileSync('./.babelrc');
var babelrcObject = {};
//load babelrc to object to change plugin base on setting
try {
  babelrcObject = JSON.parse(babelrc);
}
catch(err){
  console.error('Error in parsing .babelrc');
  console.error(err);
}
//load babelrc development env setting;
var babelrcObjectDevelopment = babelrcObject.env && babelrcObject.env.development || {};

// merge global and dev-only plugins
var combinedPlugins = babelrcObject.plugins || [];
combinedPlugins = combinedPlugins.concat(babelrcObjectDevelopment.plugins);

var babelLoaderQuery = Object.assign({}, babelrcObjectDevelopment, babelrcObject, {plugins: combinedPlugins});
delete babelLoaderQuery.env;
// Since we use .babelrc for client and server, and we don't want HMR enabled on the server, we have to add
// the babel plugin react-transform-hmr manually here.

// make sure react-transform is enabled
babelLoaderQuery.plugins = babelLoaderQuery.plugins || [];
var reactTransform = null;
for (var i = 0; i < babelLoaderQuery.plugins.length; ++i) {
  var plugin = babelLoaderQuery.plugins[i];
  if (Array.isArray(plugin) && plugin[0] === 'react-transform') {
    reactTransform = plugin;
  }
}

if (!reactTransform) {
  reactTransform = ['react-transform', {transforms: []}];
  babelLoaderQuery.plugins.push(reactTransform);
}

if (!reactTransform[1] || !reactTransform[1].transforms) {
  reactTransform[1] = Object.assign({}, reactTransform[1], {transforms: []});
}

// make sure react-transform-hmr is enabled
reactTransform[1].transforms.push({
  transform: 'react-transform-hmr',
  imports: ['react'],
  locals: ['module']
});
console.log(host,port);
const webpackConfiguration = {
  devtool: 'inline-source-map',
  entry: [
    'webpack-hot-middleware/client?path=http://' + host + ':' + port + '/__webpack_hmr',
    './shared'
  ],
  output: {
    path: assetsPath,
    filename: 'bundle.js',
    publicPath: 'http://' + host + ':' + port + '/dist/'
  },
  resolve: {
    modulesDirectories: ['shared'],
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loaders: ['babel?' + JSON.stringify(babelLoaderQuery), 'eslint-loader']
    },
    {
      test: /\.css$/,
      loaders: ['style', 'css', 'postcss']
    },
    {
      test: /\.scss$/,
      loaders: ['style', 'css', 'postcss', 'sass']
    }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.IgnorePlugin(/webpack-stats\.json$/),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: true,
      __DEVTOOLS__: true  // <-------- DISABLE redux-devtools HERE
    })
  ]
};

module.exports= webpackConfiguration;
