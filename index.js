'use strict';

require('babel-core/register')({});
require('babel-polyfill');

const server = require('./server/server').default;
const loadcsv = require('./utility/csvtojson');
const db = require('./server/db/db-model');

const PORT = process.env.PORT || 3000;


// loadcsv('goldenticket.csv')
//   .then((data) => {
//     for(var i =0; i<data.length; i++) {
//       db.saveKeyword(data[i]).then((node)=> {console.log('done!');}).catch((err)=> {console.log(err);});
//     }
//   })
//   .catch(() => {
//     console.log('failed to parse data');
//   });

server.listen(PORT, () => {
  console.log(`Server established on port ${PORT}.`);
});