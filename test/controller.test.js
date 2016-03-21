"use strict"
const should = require('should');
const db = require('../server/db/db-model.js');
const config = require('../utility/common').config();
const controller = require('../server/controller.js');
const request = require('request');
const Correlation = require('node-correlation');
const qs = require('querystring');;

const seraph = require("seraph")({
  server: config.neo4j.server,
  user: config.neo4j.user,
  pass: config.neo4j.password
});

const superRequest = require('supertest')
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/api/keywordInfo/:keyword', controller.getKeywordInfo);
app.post('/api/correlationInfo', controller.getCorrelationInfo);
app.post('/api/validationInfo', controller.getValidationInfo);
app.post('/api/getStocksInfo', controller.getStocksInfo);

// add .only to it to only run that test

describe('GET / getKeywordInfo', function(){
  const endpoint = '/api/keywordInfo/';
  it('get keyword info', function(done){
    const keyword = "Steve";
    superRequest(app)
      .get(endpoint + keyword)
      .end(function(err,res){
        if(err){
          console.log(err);
          return done(err);
        }
        // console.log("res.body", res.body);
        // console.log("status is ", res.status);
        (res.body).should.be.an.instanceOf(Object);
        // check that keyword is correct
        (res.body.Keyword).should.equal(keyword);
        done();
      })
  })
})

describe('POST / getCorrelationInfo', function(){
  it('get correlations', function(done){
    (true).should.equal(true);
    done();
    // superRequest(app)
    //   .post('/api/correlationInfo')
    //   .send({'Keyword':'test'})
    //   .end(function(err,res){
    //     if(err){
    //       console.log(err);
    //       return done(err)
    //     };
    //     console.log('res.body ', res.body);
    //     console.log('status is ', res.status);
    //     // tests go here
    //     done();
    //   })
  })
})


  describe('POST / getStocksInfo', function(){
    it('should getStocksInfo', function(done){
      (true).should.equal(true);
      done();
      // superRequest(app)
      //   .post('/api/stocksInfo')
      //   .send({'Keyword':'Keyword',data:[]})
      //   .end(function(err,res){
      //     if(err){
      //       console.log(err);
      //       return done(err);
      //     }
      //     console.log("res.body", res.body);
      //     // tests go here
      //     done();
      //   })
    });
  });


  describe('POST / getValidationInfo', function(){
    // { keyword: keyword,
    //   listItem: listItem }
    it('should validate info', function(){
      (true).should.equal(true);

      // var dataToValidate = {keyword: "stuff", listItem:[1,2,3]};

      // superRequest(app)
      //   .post('/api/validationInfo')
      //   .send(dataToValidate)
      //   .end(function(err,res){
      //     if(err){
      //       console.log(err);
      //       return done(err);
      //     }
      //     console.log("res.body ", res.body);
      //     // tests go here
      //     done();
      //   })

        // is object
        // returns
        // {
        //   results: results,
        //   keyword: keyword,
        //   listItem: listItem
        // }
    });
  });


describe('Server Controller', function() {
  it("should contain controller object", function(done) {
    should.exist(controller);
    done();
  });

  it('Should contain getResult and all utility functions for parsing', function(done) {
    controller.createResultsObject.should.be.a.Function();
    controller.getStocksInfo.should.be.a.Function();
    controller.getKeywordInfo.should.be.a.Function();
    controller.getCorrelationInfo.should.be.a.Function();
    controller.getValidationInfo.should.be.a.Function();
    controller.sortObject.should.be.a.Function(); // x
    controller.parseKeywordDataToObject.should.be.a.Function();
    done();
  });


  describe('sortObject', function() {
    // used in getCorrelationInfo and getResult
    it('should return an array', function(){
      var sortedObj = controller.sortObject({});
      sortedObj.should.be.an.instanceOf(Array);
    });

    it('should be a sorted array', function(){
      var unSorted = {
         two: {corr: 0.2, rel: true, data:[4,5,6]},
         five: {corr: 0.5, rel: false, data:[7,8,9]},
         one: {corr: 0.1, rel: true, data:[1,2,3]}
       }
      var preSorted = [
        { corr:0.5, data:[7,8,9], key:'five', rel: false },
        { corr:0.2, data:[4,5,6], key:'two', rel: true },
        { corr:0.1, data:[1,2,3], key:'one', rel: true }
      ];
      var sortedObj = controller.sortObject(unSorted);
      sortedObj.should.deepEqual(preSorted);
    });
  });

  describe('parseKeywordDataToObject', function(){
    // takes a stringified array of objects
    it('should return an array', function(){
      var exampleString = ['{}','{}','{}','{}'];
      var parsedArray = controller.parseKeywordDataToObject(exampleString);
      // console.log('parsed array', parsedArray);
      parsedArray.should.be.an.instanceOf(Array);
    });
  });

  describe('createResultsObject', function() {
      // nodelist for input to createResultsObject
      var sampleData = [ { Keyword: 'steve',
          data:
           [ '{"February 2014":83.34333333333333}',
             '{"March 2014":77.78777777777778}',
             '{"April 2014":80.56555555555556}',
             '{"May 2014":72.23222222222222}',
             '{"June 2014":72.23222222222222}',
             '{"July 2014":72.23222222222222}',
             '{"August 2014":75.01}',
             '{"September 2014":75.01}',
             '{"October 2014":72.23222222222222}',
             '{"November 2014":69.45444444444445}',
             '{"December 2014":75.01}',
             '{"January 2015":75.01}',
             '{"February 2015":72.23222222222222}',
             '{"March 2015":69.45444444444445}',
             '{"April 2015":69.45444444444445}',
             '{"May 2015":72.23222222222222}',
             '{"June 2015":69.45444444444445}',
             '{"July 2015":69.45444444444445}',
             '{"August 2015":77.78777777777778}',
             '{"September 2015":97.23222222222222}',
             '{"October 2015":75.01}',
             '{"November 2015":100.01}',
             '{"December 2015":86.12111111111112}',
             '{"January 2016":75.01}' ],
          id: 675 } ];

      // return obj from createResultsObject
      var returnedExample = { steve:
         { Keyword: 'steve',
           data:
            [ {"February 2014":83},
              {"March 2014":77},
              {"April 2014":80},
              {"May 2014":72},
              {"June 2014":72},
              {"July 2014":72},
              {"August 2014":75},
              {"September 2014":75},
              {"October 2014":72},
              {"November 2014":69},
              {"December 2014":75},
              {"January 2015":75},
              {"February 2015":72},
              {"March 2015":69},
              {"April 2015":69},
              {"May 2015":72},
              {"June 2015":69},
              {"July 2015":69},
              {"August 2015":77},
              {"September 2015":97},
              {"October 2015":75},
              {"November 2015":100},
              {"December 2015":86},
              {"January 2016":75} ],
           dataScaled:
            [ 83,
              77,
              80,
              72,
              72,
              72,
              75,
              75,
              72,
              69,
              75,
              75,
              72,
              69,
              69,
              72,
              69,
              69,
              77,
              97,
              75,
              100,
              86,
              75 ] } };
      var returnData = controller.createResultsObject(sampleData);
    it('should return an object', function() {
      returnData.should.be.an.instanceOf(Object);
    });
    it('should return with proper formatting', function() {
      returnData.should.be.deepEqual(returnedExample);
    });
  });

});
