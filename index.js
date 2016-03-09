'use strict';

require('babel-core/register')({});
require('babel-polyfill');

var server = require('./server/server').default;

var PORT = process.env.PORT || 3000;

server.listen(PORT, function () {
  console.log('Server listening on', PORT);
});