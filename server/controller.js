"use strict";
const request = require('request');
const Correlation = require('node-correlation');
const qs = require('querystring');
const db = require('./db/db-model');
const keywords = require('../alchemy/app');
const googleTrend = require('./model/google-trend-model');
const validate = require('./validate.js');
/**
 * Convert list of nodes to results object
 * @param  {Array} nodeList  List of noes
 * @return {Object}          Results object
 */
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
/**
 * Function to sort object into an array
 * @param  {Object} obj Input object to sort
 * @return {Array}      Array of sorted properties
 */
let sortObject = (obj) => {
  let arr = [];
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      arr.push({
        'key': prop,
        'corr': obj[prop]['corr'],
        'rel': obj[prop]['rel'],
        'data': obj[prop]['data']
      });
    }
  }
  arr.sort(function(a, b) {
    return b.corr - a.corr;
  });
  return arr;
};
let parseKeywordDataToObject = (stringArray) => {
  let result = [];
  for (var item of stringArray) {
    result.push(JSON.parse(item));
  }
  return result;
};
module.exports = {
  /**
   *  Return keyword if found. Else use google trend to get the data and and save it .
   * @param  {[type]} req [description]
   * @param  {[type]} res [description]
   * @return {[type]}     [description]
   */
  getKeywordInfo: function(req, res) {
    let keyword = req.params.keyword;
    db.getKeyword({
        Keyword: keyword
      })
      .then((data) => {
        // console.log('receiving result', data.length);
        if (data.length > 0) {
          let responseObj = data[0];
          responseObj.data = parseKeywordDataToObject(responseObj.data);
          res.send(responseObj);
        } else if (data.length === 0) {
          // console.log('try getting google trend');
          googleTrend.query(keyword, res)
            .then((scaledArray) => {
              // console.log('return from googleTrend', keyword, scaledArray);
              let responseObj = {
                Keyword: keyword,
                data: parseKeywordDataToObject(scaledArray)
              };
              db.saveKeyword({
                  Keyword: keyword,
                  data: scaledArray
                })
                .then((data) => {
                  console.log('Saving to DB Complete');
                });
              res.send(responseObj);
            });
        }
      });
  },

  /**
   * Get correlationInfo
   */
  getCorrelationInfo: function(req, res) {
    console.log('correlation info controller function invoked');
    //let scaledArrayOfObjs = req.body.data;
    let keyword = req.body.Keyword;
    //handle response if it already exists
    //important function that still needs to be written to handle cases where keyword already has been searched for/saved
    db.getNamesOfRelationships({
        Keyword: keyword
      })
      .then((data) => {
        // console.log("results are: " + data, data.length);
        if (data.length > 0) {
          console.log('return data back to user');
          res.send(data);
        } else if (data.length === 0) {
          console.log('try to get data');
          db.getKeyword({
              Keyword: keyword
            })
            .then((data) => {
              console.log('confirming if keyword exist');
              if (data.length > 0) {
                console.log('keyword exist');
                let scaledArrayOfObjs = data[0].data;
                db.getKeyword({})
                  .then((data) => {
                    let updated = createResultsObject(data);
                    let scaledArray = scaledArrayOfObjs.map((obj) => {
                      let parsedObj = JSON.parse(obj);
                      for (var key in parsedObj) {
                        return parsedObj[key];
                      }
                    });
                    //
                    let corrObj = {};
                    for (var keywords in updated) {
                      if (keywords !== keyword) {
                        corrObj[keywords] = {};
                        corrObj[keywords].corr = Correlation.calc(updated[keywords].dataScaled, scaledArray);
                        corrObj[keywords].data = updated[keywords].data;
                        // console.log("corrObj[keywords]:", corrObj[keywords]);
                      }
                    }
                    let sortedCorrelationsArray = sortObject(corrObj);
                    let out = [];
                    for (let i = 0; i < 10; i++) {
                      console.log("sortedCorrelationsArray["+ i +"]: " + sortedCorrelationsArray[i]);
                      console.log("got inside loop");
                      validate(keyword, sortedCorrelationsArray[i]['key'])
                      .then((bool) => {
                        console.log("at save, i is", i);
                        out.push({
                          Keyword: sortedCorrelationsArray[i]['key'],
                          corr: sortedCorrelationsArray[i]['corr'],
                          rel: bool,
                          data: sortedCorrelationsArray[i]['data']
                        });
                        console.log("Out:", out);
                        console.log("Out length:", out.length);
                        db.addKeywordToKeyword({
                          Keyword: keyword
                        }, {
                          Keyword: sortedCorrelationsArray[i]['key']
                        }, {
                          corr: sortedCorrelationsArray[i]['corr'],
                          rel: bool
                        })
                        .then((data) => {
                          console.log('relationship added ' + data);
                        });
                        if(out.length === 10) {
                          console.log("Length is 10");
                          res.send(out);
                        }
                      });
                    };
                  });
              } else {
                res.statusCode(404)
                  .send('Fail to find keyword');
              }
            });
        }
      });
  },
  getValidationInfo: function(req, res) {
    console.log('attempting to validate server side');
    var keyword = req.body.keyword;
    var listItem = req.body.listItem;
    console.log(keyword, " is keyword");
    console.log(listItem, " is listItem");
    validate(keyword, listItem)
    .then((result) => {
      console.log("Result:", result);
      if(result) {
        res.send({
          results: [1],
          keyword: keyword,
          listItem: listItem
        });
      } else {
        res.send({
          results: [],
          keyword: keyword,
          listItem: listItem
        });
      }
    });
    // var resultsPromised = [];
    // var promise = new Promise(function(resolve, reject) {
    //   keywords(keyword, listItem, function(result) {
    //     console.log("result is: ", result);
    //     if (result > .1) {
    //       if (result === 'rate limited') {
    //         console.log('awesome');
    //         res.send(result);
    //       }
    //       console.log("item validation is,", result);
    //       resolve(result);
    //     } else {
    //       resolve(result);
    //     }
    //   });
    // });
    // resultsPromised.push(promise);
    // Promise.all(resultsPromised)
    //   .then(function(results) {
    //     console.log("Results:", results);
    //     var resultsObj = {
    //       results: results,
    //       keyword: keyword,
    //       listItem: listItem
    //     };
    //     res.send(resultsObj);
    //   });
  },
  getStocksInfo: function(req, res) {
    let keyword = req.body.Keyword;
    let keywordData = req.body.data;
    let scaledArray = keywordData.map((obj) => {
      for (var keys in obj) {
        return obj[keys];
      }
    });
    db.getStock({}).then((stockList) => {
      var stockCorrList = [];
      stockList.forEach((stockObj) => {
        var promise = new Promise((resolve, reject) => {
          let stockData = JSON.parse(stockObj.data);
          let adjustedStockObj = {};
          adjustedStockObj.label = stockObj.Stock;
          let corr = 0;
          if (scaledArray.length === stockData.length) {
            corr = Correlation.calc(scaledArray, stockData);
          }
          adjustedStockObj.value = corr;
          resolve(adjustedStockObj);
          reject({});
        });
        stockCorrList.push(promise);
      });
      Promise.all(stockCorrList).then((result) => {
        console.log('the promise resolved');
        let correlationObj = {};
        correlationObj['positive'] = [];
        correlationObj['negative'] = [];
        result.forEach((stock) => {
          if (stock['value'] < -0.5) {
            stock['value'] = Math.abs(stock['value']);
            correlationObj['negative'].push(stock);
          } else if (stock['value'] > 0.5) {
            correlationObj['positive'].push(stock);
          }
        });
        res.send(correlationObj);
      });

    });
  },
  createResultsObject: createResultsObject,
  sortObject: sortObject,
  parseKeywordDataToObject: parseKeywordDataToObject
};
