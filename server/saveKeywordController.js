"use strict";
const request = require('request');
const qs = require('querystring');
const controller = require('./controller.js');
const googleTrend = require('./model/google-trend-model');
const Correlation = require('node-correlation');
const db = require('./db/db-model');
const keywords = require('../alchemy/app');
const validate = require('./validate.js');
const parser = require('rss-parser');



module.exports = {
  saveKeywordInfo: function(req, res) {
    let newKeyword = req.body.newKeyword.newKeyword;
    let userKeyword = req.body.newKeyword.oldKeyword;
    let userKeywordData = req.body.newKeyword.oldKeywordData.map((obj) => {
      for (let key in obj) {
        return obj[key]
      }
    });

    db.getKeyword({
        Keyword: newKeyword
      })
      .then((data) => {
        if (data.length > 0) {
          let responseObj = data[0];
          responseObj.data = controller.parseKeywordDataToObject(responseObj.data);
          let newKeyData = [];
          responseObj.data.forEach((obj) => {
            for (let key in obj) {
              newKeyData.push(obj[key])
            }
          });
          let responseObj.corr = Correlation.calc(newKeyData, userKeywordData);
          console.log(corr);
          res.send(responseObj);
        } else if (data.length === 0) {
          // console.log('try getting google trend');
          googleTrend.query(newKeyword, res)
            .then((scaledArray) => {
              let responseObj = {
                Keyword: newKeyword,
                data: controller.parseKeywordDataToObject(scaledArray)
              };
              db.saveKeyword({
                  Keyword: newKeyword,
                  data: scaledArray
                })
                .then((data) => {
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
  }
};
