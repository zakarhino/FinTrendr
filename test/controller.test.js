var should = require('should');
var db = require('../server/db/db-model.js');
var config = require('../utility/common').config();
var controller = require('../server/controller.js');
var request = require('request');
var Correlation = require('node-correlation');
var qs = require('querystring');
var tempData = require('./testresponse.js');

var seraph = require("seraph")({
  server: config.neo4j.server,
  user: config.neo4j.user,
  pass: config.neo4j.password
});

function wipeDB() {
  seraph.query("MATCH (n) DETACH DELETE n", function(err, result) {
    if (err) throw err;
  });
}

describe('Server Controller', function() {


  it('Should contain getResult and all utility functions for parsing', function() {
    controller.getResult.should.be.a.Function();
    controller.queryGtrends.should.be.a.Function();
    controller.convertGtrends.should.be.a.Function();
    controller.createResultsObject.should.be.a.Function();
  });

  describe('convertGtrends', function() {

    var tempGoogleResponse = eval(tempData.tempString.slice(61));
    it('should return an array', function() {
      var x = controller.convertGtrends(tempGoogleResponse);
      x.should.be.an.instanceOf(Array);
    });
  });

  describe('createResultsObject', function() {
    it('should return an object', function() {
      // return db.getKeyword({}).should.be.fulfilled().then(function(data) {
      //   console.log(data);
      var tempData = [{Keyword: 'bobbert', 
      date:['{"a":100}','{"b":100}','{"c":100}','{"d":100}','{"e":100}','{"f":100}','{"g":100}','{"h":100}','{"i":100}','{"j":100}','{"k":100}','{"l":100}']}];
      console.log(typeof tempData);
      var x = controller.createResultsObject(tempData);

      x.should.be.an.instanceOf(Object);
    });
  });
});
