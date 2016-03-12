"use strict";

const request = require('request');
const Correlation = require('node-correlation');
const qs = require('querystring');
const db = require('./db/db-model');

/**
 * Query google trends data
 * @param  {String} keyword Keyword to search on Google Trends
 * @param  {Object} res     Response object
 * @return {Object}         JSON object returned from Google Trends
 */
let queryGtrends = (keyword, res) => {
  return new Promise((resolve, reject) => {
    let url = 'http://www.google.com/trends/fetchComponent?hl=en-US&geo=US&q=' + keyword + '&cid=TIMESERIES_GRAPH_0&export=3';
    request.get(url, (err, response, body) => {
      if (err) {
        res.send(new Error('Error making a get request to google trends'));
        return reject(err);
      } else {
        let info = convertGtrends(eval(body.slice(61)));
        return resolve(info);
      }
    });
  });
};

/**
 * Convert Google Trends data to array
 * @param  {Object} info Data returned from queryGtrends function
 * @return {Array}       Array of converted information
 */
let convertGtrends = (info) => {
  console.dir(info);
  let results = [];
  let dates = [];
  for (var i = 25; i > 1; i--) {
    results.push(info.table.rows[info.table.rows.length - i].c[1].v);
    dates.push(info.table.rows[info.table.rows.length - i].c[0].f)
  }
  let max = 100 / Math.max.apply(Math, results);
  let scaledArray = results.map(function(result) {
    return result * max + .01;
  });
  let scaledArrayOfObjs = [];

  scaledArray.forEach((value, index) => {
    let obj = {}
    obj[dates[index]] = value;
    scaledArrayOfObjs.push(JSON.stringify(obj));
  });
  return scaledArrayOfObjs;
};

/**
 * Convert list of nodes to results object
 * @param  {Array} nodeList  List of noes
 * @return {Object}          Results object
 */
let createResultsObject = (nodeList) => {
  //Keyword:
  //data: [{},{},]
  console.log('the nodelist is ', nodeList);
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
      console.log('successfully parsed', numberArray);
      let max = Math.max.apply(Math, numberArray);
      console.log('max is: ', max);
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
        'value': obj[prop]['corr'],
        'data': obj[prop]['data']
      });
    }
  }
  arr.sort(function(a, b) {
    return b.value - a.value;
  });

  return arr;
};

let parseKeywordDataToObject = (stringArray) => {
  let result = [];
  for (var item of stringArray)
  {
    result.push(JSON.parse(item));
  }
  return result ;
}

module.exports = {
  /**
   * To fill in
   * @param  {[type]} req [description]
   * @param  {[type]} res [description]
   * @return {[type]}     [description]
   */
  getKeywordInfo: function(req, res) {
    console.log('keyword info invoked');
    let keyword = req.params.keyword;
    console.log(keyword);
    db.getKeyword({
        Keyword: keyword
      })
      .then((data) => {
        console.log('sending info back from keyword db');
        if (data.length > 0) {
          let responseObj = data[0];
          data[0].data = parseKeywordDataToObject(data[0].data)
          res.send(responseObj);
        } else if (data.length === 0) {
          queryGtrends(keyword, res)
            .then((scaledArray) => {
              console.log('sending info back from keyword gtrends');
              res.send({
                Keyword: keyword,
                data: scaledArray
              });
            });
        }
      });
  },

  getCorrelationInfo: function(req, res) {
    console.log('correlation info controller function invoked');
    let scaledArrayOfObjs = req.body.data;
    let keyword = req.body.Keyword;

    db.getKeyword({
        Keyword: keyword
      })
      .then((data) => {
        //handle response if it already exists
        //important function that still needs to be written to handle cases where keyword already has been searched for/saved
        if (data.length > 0) {
          // console.log('data is', data[0]);
          db.getNamesOfRelationships({
              Keyword: data[0].Keyword
            })
            .then((results) => {
              console.log("results are: " + results);
              res.send(results);
            });
        }
        if (data.length === 0) {
          db.getKeyword({})
            .then((data) => {
              let updated = createResultsObject(data);
              let scaledArray = scaledArrayOfObjs.map((obj) => {
                let parsedObj = JSON.parse(obj);
                for (var key in parsedObj) {
                  return parsedObj[key];
                }
              });
              let corrObj = {};
              for (var keywords in updated) {
                corrObj[keywords] = {};
                corrObj[keywords].corr = Correlation.calc(updated[keywords].dataScaled, scaledArray);
                corrObj[keywords].data = updated[keywords].data;
              }
              let sortedCorrelationsArray = sortObject(corrObj);
              let scaledArrayOfObjects = [];

              // scaledArray.forEach(function(data, i) {
              //   scaledArrayOfObjects.push(JSON.stringify({
              //     i: data
              //   }));
              // });

              db.saveKeyword({
                  Keyword: keyword,
                  data: scaledArrayOfObjs
                })
                .then((data) => {
                  let topTen = [];
                  for (var i = 0; i < 10; i++) {
                    topTen.push({
                      Keyword: sortedCorrelationsArray[i]['key'],
                      corr: sortedCorrelationsArray[i]['value'],
                      data: sortedCorrelationsArray[i]['data']
                    });
                    db.addKeywordToKeyword({
                        Keyword: keyword
                      }, {
                        Keyword: sortedCorrelationsArray[i]['key']
                      }, sortedCorrelationsArray[i]['value'])
                      .then((data) => {
                        console.log('relationship added ' + data);
                      });
                  }
                  res.send(topTen);
                });
            });
        }
      });
  },
  getResult: function(req, res) {
    console.log("CALLED GET RESULT");
    let keyword = req.query.keyword;

    db.getKeyword({
        Keyword: keyword
      })
      .then((data) => {
        //handle response if it already exists
        //important function that still needs to be written to handle cases where keyword already has been searched for/saved
        if (data.length > 0) {
          db.getNamesOfRelationships({
              Keyword: data[0].Keyword
            })
            .then((results) => {
              res.send({
                corr: results
              });
            });
        }
        if (data.length === 0) {
          db.getKeyword({})
            .then((data) => {
              queryGtrends(keyword, res)
                .then((scaledArray) => {
                  let updated = createResultsObject(data);

                  let corrObj = {};
                  for (var keywords in updated) {
                    corrObj[keywords] = Correlation.calc(updated[keywords], scaledArray);
                  }
                  let sortedCorrelationsArray = sortObject(corrObj);
                  let scaledArrayOfObjects = [];

                  scaledArray.forEach(function(data, i) {
                    scaledArrayOfObjects.push(JSON.stringify({
                      i: data
                    }));
                  });
                  scaledArrayOfObjects;
                  db.saveKeyword({
                      Keyword: keyword,
                      data: scaledArrayOfObjects
                    })
                    .then((data) => {
                      // console.log("keyword is" + keyword);
                      // console.log('we saved' + data.Keyword);

                      let topTen = [];
                      for (var i = 0; i < 10; i++) {
                        console.log('the sorted correlation array is', sortedCorrelationsArray[i]);
                        topTen.push({
                          Keyword: sortedCorrelationsArray[i]['key'],
                          corr: sortedCorrelationsArray[i]['value'],
                          data: sortedCorrelationsArray[i]['data']
                        });
                        db.addKeywordToKeyword({
                            Keyword: keyword
                          }, {
                            Keyword: sortedCorrelationsArray[i]['key']
                          }, sortedCorrelationsArray[i]['value'])
                          .then((data) => {
                            console.log('relationship added ' + data);
                          });
                      }
                      res.send({
                        corr: topTen
                      });
                    });
                });
            });

        }
      });
  },
  queryGtrends: queryGtrends,
  convertGtrends: convertGtrends,
  createResultsObject: createResultsObject,
  sortObject: sortObject
};
