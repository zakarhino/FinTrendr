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

function wipeDB() {
  seraph.query("MATCH (n) DETACH DELETE n", function(err, result) {
    if (err) throw err;
  });
}

describe('Server Controller', function() {
  it("should contain controller object", function() {
    should.exist(controller);
  });

  it('Should contain getResult and all utility functions for parsing', function() {
    controller.createResultsObject.should.be.a.Function();
  });

  // describe('createResultsObject', function() {
  //   it('should return an object', function() {
  //     // return db.getKeyword({}).should.be.fulfilled().then(function(data) {
  //     //   console.log(data);
  //     var tempData = [{Keyword: 'bobbert',
  //     date:['{"a":100}','{"b":100}','{"c":100}','{"d":100}','{"e":100}','{"f":100}','{"g":100}','{"h":100}','{"i":100}','{"j":100}','{"k":100}','{"l":100}']}];
  //     console.log(typeof tempData);
  //     var x = controller.createResultsObject(tempData);

  //     x.should.be.an.instanceOf(Object);
  //   });
  // });

});
