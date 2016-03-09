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
  let results = [];
  for (var i = 26; i > 2; i--) {
    results.push(info.table.rows[info.table.rows.length - i].c[1].v);
  }
  let max = 100 / Math.max.apply(Math, results);
  let scaledArray = results.map(function(result) {
    return result * max;
  });
  return scaledArray;
};

/**
 * Convert list of nodes to results object
 * @param  {Array} nodeList  List of noes
 * @return {Object}          Results object
 */
let createResultsObject = (nodeList) => {
  let updated = {};
  nodeList.forEach(function(node) {

    let numberArray = [];
    // console.log('node date is '+ node.date + node.Keyword);
    // console.log('node date is '+ node.date + typeof node.Keyword);
    node.date.forEach(function(dateObj) {
      let parsedObj = JSON.parse(dateObj);
      for (var key in parsedObj) {
        numberArray.push(parsedObj[key]);
      }
    });
    let max = Math.max.apply(Math, numberArray);
    updated[node.Keyword] = [];
    for (var i = 0; i < numberArray.length; i++) {
      if (Number.isNaN(numberArray[i] / max * 100)) {
        updated[node.Keyword].push(.01);
      } else {
        updated[node.Keyword].push(numberArray[i] / max * 100);
      }
    }


  });
  console.log('the updated obj is', updated);
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
        'value': obj[prop]
      });
    }
  }
  arr.sort(function(a, b) {
    return b.value - a.value;
  });

  return arr;
};

module.exports = {
  /**
   * To fill in
   * @param  {[type]} req [description]
   * @param  {[type]} res [description]
   * @return {[type]}     [description]
   */
  getResult: function(req, res) {
    let keyword = req.query.keyword;

    db.getKeyword({ Keyword: keyword }).then((data) => {
      //handle response if it already exists
      //important function that still needs to be written to handle cases where keyword already has been searched for/saved
      if (data.length > 0) {
        console.log(data[0]);
        db.getNamesOfRelationships({ Keyword: data[0].Keyword }).then((results) => {
          console.log("results are: " + results);
          res.send({ corr: results });
        });
      }
      if (data.length === 0) {
        db.getKeyword({}).then((data) => {
          queryGtrends(keyword, res).then((scaledArray) => {
            console.log(scaledArray);
            let updated = createResultsObject(data);
            console.log(updated.length, "the updated length is");
            let corrObj = {};
            for (var keywords in updated) {
              corrObj[keywords] = Correlation.calc(updated[keywords], scaledArray);
              //1 to -1 correlation
            }
            console.log('the corrObj is: ', corrObj);
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
                date: scaledArrayOfObjects
              })
              .then((data) => {
                console.log("keyword is" + keyword);
                console.log('we saved' + data.Keyword);

                let topTen = [];
                for (var i = 0; i < 10; i++) {
                  console.log('the sorted correlation array is', sortedCorrelationsArray[i]);
                  topTen.push({ keyword: sortedCorrelationsArray[i]['key'], correlation: sortedCorrelationsArray[i]['value'] });
                  db.addKeywordToKeyword({ Keyword: keyword }, { Keyword: sortedCorrelationsArray[i]['key'] }, sortedCorrelationsArray[i]['value']).then((data) => {
                    console.log('relationship added ' + data);
                  });
                }
                res.send({ corr: topTen });
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
