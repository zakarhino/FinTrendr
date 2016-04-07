'use strict';

require('babel-core/register')({});
require('babel-polyfill');

// hey this is cool

const server = require('./server/server').default;
const loadcsv = require('./utility/csvtojson.js');
const db = require('./server/db/db-model.js');
const stockData = require('./setup/stockData/stockData.js');
const request = require('request');

const PORT = process.env.PORT || 3000;

// loadcsv.loadCSV('setup/Companies3.csv')
//   .then((data) => {
//     for(var i =0; i<data.length; i++) {
//       db.saveKeyword(data[i]).then((node)=> {console.log('done!');}).catch((err)=> {console.log(err);});
//     }
//   })
//   .catch(() => {
//     console.log('failed to parse data');
//   }).then(function (){
//     console.log("done all!");
//   });

// let SPX = stockData.SPX;
// let etfData = [];
// SPX.forEach((symbol) => {
//   console.log('hey hey');
//   var promise = new Promise((resolve, reject) => {
//     console.log('promise in');
//     console.log(symbol);
//     request.get('https://www.quandl.com/api/v3/datasets/WIKI/' + symbol.Symbol + '/data.json?column_index=4&api_key=fiuzUjysoMY6y1FMEbBE&start_date=2014-02-28&end_date=2016-01-31&order=asc&collapse=monthly',
//       (err, response, body) => {
//         console.log('request response');
//         console.log("body type:", typeof body);
//         var parsedBody = JSON.parse(body);
//         if (err) {
//           reject(err);
//         } else {
//           let returnObj = {};
//           returnObj.data = parsedBody['dataset_data'].data.map((closingPrice) => {
//             return closingPrice[1];
//           });
//           returnObj.Stock = symbol.Symbol;
//           returnObj.Sector = symbol.Sector;
//           returnObj.Name = symbol.Name;
//           resolve(returnObj);
//         }
//       });
//   });
//   etfData.push(promise);
// });
// Promise.all(etfData).then((results) => {
//   results.forEach((stock) => {
//     stock.data = JSON.stringify(stock.data);
//     db.saveStock( stock ).then((node) => {
//         console.log('done!');
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   });
// });

server.listen(PORT, () => {
  console.log(`Server established on port ${PORT}.`);
});
