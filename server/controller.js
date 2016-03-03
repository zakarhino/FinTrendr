"use strict"
const request = require('request');
const Correlation = require('node-correlation');

module.exports  = {
  getResult:function(req,res) {
    let tempObject = {
      companyName: 'google',
      tempArray: [ 100,
        100,
        100,
        100,
        81.62162162162161,
        81.62162162162161,
        100,
        100,
        100,
        100,
        100,
        100,
        81.62162162162161,
        100,
        81.62162162162161,
        81.62162162162161,
        81.62162162162161,
        81.62162162162161,
        81.62162162162161,
        81.62162162162161,
        81.62162162162161,
        81.62162162162161,
        81.62162162162161,
        81.62162162162161 ]
      };
    let keyword = req.body;
    let url = 'http://www.google.com/trends/fetchComponent?hl=en-US&geo=US&q='+keyword+'&cid=TIMESERIES_GRAPH_0&export=3';
    
    request.get(url, function(err,response,body) {
      if(err) {
        res.send('Error making a get request to google trends');
      } else {
        let info = eval(body.slice(61));
        let results = [];
        for(var i = 26; i > 2; i--) {
          results.push(info.table.rows[info.table.rows.length-i].c[1].v);
        }
        let max = 100/Math.max.apply(Math,results);
        let scaledArray = results.map(function(result) {
          return result*max;
        });
        let corr = Correlation.calc(tempObject.tempArray,scaledArray);
        res.send({companyName: tempObject.companyName, corr: corr});
      }
    });

  }
}