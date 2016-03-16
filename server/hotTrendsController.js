"use strict";

const request = require('request');
const qs = require('querystring');

module.exports = {
  getHotTrendsInfo: function(req, res) {
    request.get('http://hawttrends.appspot.com/api/terms/', (err, response, body) => {
      if (err) {
        res.send('')
      } else {
        let bodyParsed = JSON.parse(body);
        console.log(bodyParsed[1]);
        res.send(bodyParsed[1]);
      }
    });
  }
};
