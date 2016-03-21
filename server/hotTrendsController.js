"use strict";

const request = require('request');
const qs = require('querystring');
const popularController = require('./popularController.js');

module.exports = {
  getHotTrendsInfo: function(req, res) {
    request.get('http://hawttrends.appspot.com/api/terms/', (err, response, body) => {
      if (err) {
        res.send('')
      } else {
        request.get('https://api.stocktwits.com/api/2/trending/symbols/equities.json', (err, response, twitsBody) => {
          if (err) {
            res.send('');
          } else {
            let bodyParsed = JSON.parse(body);
            let twitsBodyParsed = JSON.parse(twitsBody);
            let twitSymbols = twitsBodyParsed.symbols.map((symbolObj) => {
              // console.log(symbolObj);
              return symbolObj.symbol;
            });
            //console.log(bodyParsed[1]);

            popularController.getPopularInfo().then((randomTen) => {
                //console.log('outside the db');
                res.send({
                  keywords: bodyParsed[1],
                  stocks: twitSymbols,
                  randomTen: randomTen
                });
              })
              .catch((err) => {
                console.log('err is', err);
                res.send({
                  keywords: bodyParsed[1],
                  stocks: twitSymbols

                });

              });
          }
        });
      }
    });
  }
};
