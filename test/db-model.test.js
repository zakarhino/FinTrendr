"use strict";

const should = require('should');
const db = require('../server/db/db-model.js');
const config = require('../utility/common').config();

// Use seraph instance for testing db-model functions
const seraph = require("seraph")({
  server: config.neo4j.server,
  user: config.neo4j.user,
  pass: config.neo4j.password
});

// Wipe the DB after every test
function wipeDB() {
  seraph.query("MATCH (n) DETACH DELETE n", function(err, result) {
    if (err) throw err;
  });
}

// General DB model testing
describe('DB Model', function() {
  // Define the slow time to be 1 second to account for DB delays
  this.slow(1000);
  // The Db model should import correctly
  it("should contain db object", function() {
    should.exist(db);
  });

  // Verify all functions are actually functions
  it("should contain all DB utility Promise functions", function() {
    db.saveStock.should.be.a.Function();
    db.saveKeyword.should.be.a.Function();
    db.getStock.should.be.a.Function();
    db.getKeyword.should.be.a.Function();
    db.deleteStock.should.be.a.Function();
    db.deleteKeyword.should.be.a.Function();
    db.addKeywordToKeyword.should.be.a.Function();
    db.testDbConnection.should.be.a.Function();
  });

  // Test connecting to database
  it("should connect to database", function(done) {
    return db.testDbConnection()
    .should.be.fulfilled()
    .then(function(res) {
      res.should.equal(true);
      done();
    });
  });

  // Test stock saving to neo4j
  describe('saveStock', function() {
    after(wipeDB);
    it('should save stock to database', function(done) {
      return db.saveStock({Stock: "Apple Inc.", tag: "AAPL", date: ["some", "kind", "of", "data"]})
      .should.be.fulfilled()
      .then(function(result) {
        result.should.be.an.instanceOf(Object);
        seraph.find({Stock: "Apple Inc."}, function(err, stock) {
          should.not.exist(err);
          stock.should.be.an.instanceOf(Array).and.have.lengthOf(1);
          done();
        });
      });
    });
  });

  // Test keyword saving to neo4j
  describe('saveKeyword', function() {
    after(wipeDB);
    it('should save keyword to database', function(done) {
      return db.saveKeyword({Keyword: "tea", date: ["some", "kind", "of", "data"]})
      .should.be.fulfilled()
      .then(function(result) {
        result.should.be.an.instanceOf(Object);
        seraph.find({Keyword: "tea"}, function(err, keyword) {
          should.not.exist(err);
          keyword.should.be.an.instanceOf(Array).and.have.lengthOf(1);
          done();
        });
      });
    });
  });
});
