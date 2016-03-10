'use strict';

require('babel-core/register')({});
require('babel-polyfill');

const server = require('./server/server').default;

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server established on port ${PORT}.`);
});