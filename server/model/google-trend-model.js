"use strict";
const request = require('request');
module.exports = {
  /**
   * Query google trends data
   * @param  {String} keyword Keyword to search on Google Trends
   * @param  {Object} res     Response object
   * @return {Object}         JSON object returned from Google Trends
   */
  query: function(keyword, res) {
    return new Promise((resolve, reject) => {
      let url = 'http://www.google.com/trends/fetchComponent?hl=en-US&geo=US&q=' + keyword + '&cid=TIMESERIES_GRAPH_0&export=3';
      request.get(url, (err, response, body) => {
        if (err) {
          res.send(new Error('Error making a get request to google trends'));
          return reject(err);
        } else {
          let info = this.convertGtrends(eval(body.slice(61)));
          return resolve(info);
        }
      });
    });
  },
  /**
   * Convert Google Trends data to array
   * @param  {Object} info Data returned from queryGtrends function
   * @return {Array}       Array of converted information
   */
  convertGtrends: function(info) {
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
  }
}
