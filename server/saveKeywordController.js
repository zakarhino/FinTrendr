"use strict";
const request = require('request');
const qs = require('querystring');
const KeywordHelper = require('../utility/KeywordHelp.js');
const googleTrend = require('./model/google-trend-model');
const Correlation = require('node-correlation');
const db = require('./db/db-model');
module.exports = {
  saveKeywordInfo: function(req, res) {
    let newKeyword = req.body.newKeyword.newKeyword;
    let userKeyword = req.body.newKeyword.oldKeyword;
    console.log('trying to access db', newKeyword, userKeyword)
    db.getKeyword({
      Keyword: userKeyword
    }).then((baseKeywordData) => {
      console.log('found user keyword',baseKeywordData)
      baseKeywordData[0].data = KeywordHelper.parseKeywordDataToObject(baseKeywordData[0].data);
      let userKeywordData = [];
      baseKeywordData[0].data.forEach((obj) => {
        for (let key in obj) {
          userKeywordData.push(obj[key])
        }
      })
      console.log('triggering find enw keyword')
      db.getKeyword({
        Keyword: newKeyword
      }).then((data) => {
        console.log('found')
        if (data.length > 0) {
          let responseObj = { Keyword:data[0].Keyword ,data :data[0].data} ;
          responseObj.data = KeywordHelper.parseKeywordDataToObject(responseObj.data);
          let newKeyData = [];
          responseObj.data.forEach((obj) => {
            for (let key in obj) {
              newKeyData.push(obj[key])
            }
          });
          console.log(newKeyData,userKeywordData)
          responseObj.corr = Correlation.calc(newKeyData, userKeywordData);
          responseObj.rel = false;
          console.log(responseObj.corr);
          res.send(responseObj);
        } else if (data.length === 0) {
          // console.log('try getting google trend');
          //
          console.log('not found')
          googleTrend.query(newKeyword, res).then((scaledArray) => {
            let responseObj = {
              Keyword: newKeyword,
              data: KeywordHelper.parseKeywordDataToObject(scaledArray)
            };
            db.saveKeyword({
              Keyword: newKeyword,
              data: scaledArray
            }).then((data) => {
              console.log('Saving to DB Complete');
              let newKeyData = [];
              responseObj.data.forEach((obj) => {
                for (let key in obj) {
                  newKeyData.push(obj[key])
                }
              });
              responseObj.corr = Correlation.calc(newKeyData, userKeywordData);
              console.log(corr);
              res.send(responseObj);
            });
          });
        }
      });
    })
  }
};
