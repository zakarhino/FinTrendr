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
        let urlList = [];
        req.body.urls.forEach((url) => {
            let promise = new Promise((resolve, reject) => {


                keywords(req.body.keyword, req.body.listItem, url.link).then((result) => {
                    if (result > .1) {
                        if (result === 'rate limited') {
                            resolve("");
                        } else {
                            resolve(url.link);
                        }
                    } else {
                        resolve("");
                    }
                });
            });
            urlList.push(promise);
        });

        Promise.all(urlList).then((results) => {
            res.send({ "result": results, "url": results })
        });
    }
};
