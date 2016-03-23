"use strict";
const request = require('request');
const Correlation = require('node-correlation');
const qs = require('querystring');
const db = require('./db/db-model');
const keywords = require('../alchemy/app');
const googleTrend = require('./model/google-trend-model');
const validate = require('./validate.js');
const parser = require('rss-parser');


module.exports = {
  getAlchemyInfo: function(req, res) {
    keywords(req.body.keyword, req.body.listItem, req.body.url).then((result) => {
      if (result > .1) {
        if (result === 'rate limited') {
          res.send({"result": result, "url": ""});
        }
        res.send({"result": result, "url": req.body.url});
      } else {
        res.send({"result": result, "url": ""});
      }
    });
  }
}
