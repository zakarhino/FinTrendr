"use strict";
const request = require('request');
const Correlation = require('node-correlation');
const qs = require('querystring');
const db = require('./db/db-model');
const keywords = require('../alchemy/app');
const googleTrend = require('./model/google-trend-model');
const validate = require('./validate.js');
const parser = require('rss-parser');
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
      let keyArray = [];
      var count2 = 0;
      node.data.forEach(function(dateObj) {
        let parsedObj = JSON.parse(dateObj);
        for (var key in parsedObj) {
          keyArray.push(key);
          numberArray.push(parseInt(parsedObj[key]));
        }
      });
      // console.log('successfully parsed', numberArray);
      let max = Math.max.apply(Math, numberArray);
      // console.log('max is: ', max);
      updated[node.Keyword] = {};
      updated[node.Keyword]['Keyword'] = node.Keyword;
      updated[node.Keyword]['dataScaled'] = [];
      updated[node.Keyword].data = [];
      for (var i = 0; i < numberArray.length; i++) {
        let value = .01;
        let resultDataObj = {};
        if (!Number.isNaN(numberArray[i] / max * 100)) {
          value = numberArray[i] / max * 100;
        }
        updated[node.Keyword].dataScaled.push(value);
        resultDataObj[keyArray[i]] = value
        updated[node.Keyword].data.push(resultDataObj);
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
//Parse keyword Data from String to Object
let parseKeywordDataToObject = (stringArray) => {
  let result = [];
  for (var item of stringArray) {
    result.push(JSON.parse(item));
  }
  return result;
};
//parse Stock data to result for client side Treemap
let parseStockToResult = (sectorObj) => {
    let correlationObj = {
      name: 'stock',
      children: []
    }
    for (let key in sectorObj) {
      let keyChildren = [];
      if (sectorObj[key].negative) {
        keyChildren.push({
          name: 'negative',
          children: sectorObj[key].negative
        });
      }
      if (sectorObj[key].positive) {
        keyChildren.push({
          name: 'positive',
          children: sectorObj[key].positive
        });
      }
      correlationObj.children.push({
        name: key,
        children: keyChildren
      })
    }
    return correlationObj
  }
  //Build Sector Information for stockList
let buildSectorObj = (stockList, scaledArray) => {
    let sectorObj = {}
    stockList.forEach((stockObj) => {
      let stockData = JSON.parse(stockObj.data);
      let corr = 0;
      let adjustedStockObj = {};
      adjustedStockObj.label = stockObj.Stock;
      if (scaledArray.length === stockData.length) {
        corr = Correlation.calc(scaledArray, stockData);
      }
      adjustedStockObj.value = corr;
      if (corr < -0.3) {
        adjustedStockObj.value = Math.abs(adjustedStockObj.value);
        sectorObj[stockObj.Sector] = sectorObj[stockObj.Sector] || {};
        sectorObj[stockObj.Sector].negative = sectorObj[stockObj.Sector].negative || [];
        sectorObj[stockObj.Sector].negative.push(adjustedStockObj);
      } else if (corr > 0.3) {
        sectorObj[stockObj.Sector] = sectorObj[stockObj.Sector] || {};
        sectorObj[stockObj.Sector].positive = sectorObj[stockObj.Sector].positive || [];
        sectorObj[stockObj.Sector].positive.push(adjustedStockObj);
      }
    });
    return sectorObj;
  }
  //scaled normal array for client side
let scaleResultToClient = (node) => {
  // console.log('the nodelist is ', nodeList);
  const updated = {};
  if (node.Keyword) {
    let numberArray = [];
    let keyArray = [];
    var count2 = 0;
    node.data.forEach(function(dateObj) {
      let parsedObj = JSON.parse(dateObj);
      for (var key in parsedObj) {
        keyArray.push(key);
        numberArray.push(parseInt(parsedObj[key]));
      }
    });
    // console.log('successfully parsed', numberArray);
    let max = Math.max.apply(Math, numberArray);
    // console.log('max is: ', max);
    updated.Keyword = node.Keyword;
    updated.data = [];
    if (node.corr){
      updated.corr = node.corr
    }
    if (node.rel !==undefined){
      updated.rel = node.rel;
    }
    for (var i = 0; i < numberArray.length; i++) {
      let value = .01;
      let resultDataObj = {};
      if (!Number.isNaN(numberArray[i] / max * 100)) {
        value = numberArray[i] / max * 100;
      }

      resultDataObj[keyArray[i]] = value
      updated.data.push(resultDataObj);
    }

    console.log('in scaling data',updated.data);
  }
  return updated;
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
    }).then((data) => {
      // console.log('receiving result', data.length);
      if (data.length > 0) {
        let responseObj = scaleResultToClient(data[0]);
        res.send(responseObj);
      } else if (data.length === 0) {
        // console.log('try getting google trend');
        googleTrend.query(keyword, res).then((scaledArray) => {
          // console.log('return from googleTrend', keyword, scaledArray);
          let responseObj = {
            Keyword: keyword,
            data: parseKeywordDataToObject(scaledArray)
          };
          db.saveKeyword({
            Keyword: keyword,
            data: scaledArray
          }).then((data) => {
            //console.log('Saving to DB Complete');
          });
          res.send(responseObj);
        }).
        catch( (info) => {
          console.log("Error with Google Trends");
          res.send({})
        });
      }
    });
  },
  /**
   * Get correlationInfo
   */
  getCorrelationInfo: function(req, res) {
    //console.log('correlation info controller function invoked');
    //let scaledArrayOfObjs = req.body.data;
    let keyword = req.body.Keyword;
    //handle response if it already exists
    //important function that still needs to be written to handle cases where keyword already has been searched for/saved
    console.log('getting relationship');
    db.getNamesOfRelationships({
      Keyword: keyword
    }).then((data) => {
      // console.log("results are: " + data, data.length);
      if (data.length > 0) {
         let result = data.map(function(item){
           return scaleResultToClient(item);
         })
        res.send(result);
      } else if (data.length === 0) {
        db.getKeyword({
          Keyword: keyword
        }).then((data) => {
          if (data.length > 0) {
            //Base Keyword Object
            let scaledArrayOfObjs = data[0].data;
            db.getKeyword({}).then((data) => {
              //All Keyword Object
              let updated = createResultsObject(data);
              //get the Base Keyword Scaled Array Object
              let scaledArray = scaledArrayOfObjs.map((obj) => {
                let parsedObj = JSON.parse(obj);
                for (var key in parsedObj) {
                  return parseInt(parsedObj[key]);
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
              let promiseArray = []
              for (let i = 0; i < 10; i++) {
                // console.log("sortedCorrelationsArray[" + i + "]: " + sortedCorrelationsArray[i]);
                // console.log("got inside loop");
                //
                var promise = new Promise((resolve, reject) => {
                  validate(keyword, sortedCorrelationsArray[i]['key']).then((bool) => {
                  // console.log("at save, i is", i);
                  out.push({
                    Keyword: sortedCorrelationsArray[i]['key'],
                    corr: sortedCorrelationsArray[i]['corr'],
                    rel: bool,
                    data: sortedCorrelationsArray[i]['data']
                  });
                  // console.log("Out:", out);
                  // console.log("Out length:", out.length);
                  db.addKeywordToKeyword({
                    Keyword: keyword
                  }, {
                    Keyword: sortedCorrelationsArray[i]['key']
                  }, {
                    corr: sortedCorrelationsArray[i]['corr'],
                    rel: bool
                  }).then((data) => {
                    resolve();
                    // console.log('relationship added ' + data);
                  });

                });
              });
              promiseArray.push(promise)
              };
              Promise.all(promiseArray).then((data)=>{
                if (out.length === 10) {
                // console.log("Length is 10");
                out.sort(function(a,b){
                  return b.corr - a.corr
                })
                res.send(out);
                }
              });
            });
          } else {
            res.statusCode(404).send('Fail to find keyword');
          }
        });
      }
    });
  },
  getValidationInfo: function(req, res) {
    // console.log('attempting to validate server side');
    var keyword = req.body.keyword;
    var listItem = req.body.listItem;
    // console.log(keyword, " is keyword");
    // console.log(listItem, " is listItem");
    validate(keyword, listItem).then((result) => {
      // console.log("Result:", result);
      if (result) {
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
      let sectorObj = buildSectorObj(stockList, scaledArray);
      let correlationObj = parseStockToResult(sectorObj);
      //  console.log(correlationObj);
      res.send(correlationObj);
    });
  },
  getNews: function(req, res) {
    let url = `https://news.google.com/news/section?output=rss&q=${req.params.keyword}`;
    parser.parseURL(url, (err, parsed) => {
      // console.log("Sending:", JSON.stringify(parsed.feed.entries));
      // console.log("The URL is:", url);
      res.send(JSON.stringify(parsed.feed.entries));
    });
  },
  createResultsObject: createResultsObject,
  sortObject: sortObject,
  parseKeywordDataToObject: parseKeywordDataToObject
};
