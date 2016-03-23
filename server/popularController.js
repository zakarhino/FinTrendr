"use strict";

const request = require('request');
const qs = require('querystring');
const db = require('./db/db-model');

let createResultsObject = (nodeList) => {
  // console.log('the nodelist is ', nodeList);
  let updated = {};
  var count = 0;
  nodeList.forEach(function(node) {
    if (node.Keyword) {
      let numberArray = [];
      var count2 = 0;
      node.data.forEach(function(dateObj) {
        let parsedObj = JSON.parse(dateObj);
        for (var key in parsedObj) {
          numberArray.push(parsedObj[key]);
        }
      });
      // console.log('successfully parsed', numberArray);
      let max = Math.max.apply(Math, numberArray);
      // console.log('max is: ', max);
      updated[node.Keyword] = {};
      updated[node.Keyword]['Keyword'] = node.Keyword;
      updated[node.Keyword]['data'] = node.data;
      updated[node.Keyword]['dataScaled'] = [];
      for (var i = 0; i < numberArray.length; i++) {
        if (Number.isNaN(numberArray[i] / max * 100)) {
          updated[node.Keyword].dataScaled.push(.01);
        } else {
          updated[node.Keyword].dataScaled.push(numberArray[i] / max * 100);
        }
      }
    }
  });
  return updated;
};

module.exports = {
  getPopularInfo: function() {
    return new Promise((resolve, reject) => {
      db.getKeyword({})
        .then((data) => {
          let updated = createResultsObject(data);
          let popularArray = [];
          for (var keywords in updated) {
            let tempLength = updated[keywords].dataScaled.length;
            if (updated[keywords].dataScaled[tempLength - 1] > 99.99) {
              if (updated[keywords].dataScaled[tempLength - 2] < 99.99) {
                let tempDataLength = updated[keywords].data.length;
                let lastMonth = JSON.parse(updated[keywords].data[tempDataLength - 1]);
                for (var key in lastMonth) {
                  if (lastMonth[key] > 99000) {
                    //console.log('PARTY');
                    popularArray.push(keywords);
                  }
                }

              }
            }
          }
          let randomTen = [];
          for (var i = 0; i < 10; i++) {
            randomTen.push(popularArray[i]);
          }
          //console.log(randomTen);
          resolve(randomTen);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
};
