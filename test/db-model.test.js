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
function wipeDB(done) {
  seraph.query("MATCH (n) DETACH DELETE n", function(err, result) {
    if (err) throw err;
    done();
  });
}

// General DB model testing
describe('DB Model', function() {
  // Define the slow time to be 1 second to account for DB delays
  this.slow(2000);
  this.timeout(8000);
  // The Db model should import correctly
  it("should contain db object", function() {
    should.exist(db);
  });

  // Verify all functions are actually functions
  it("should contain all DB utility functions", function() {
    db.saveStock.should.be.an.instanceOf(Function);
    db.saveKeyword.should.be.an.instanceOf(Function);
    db.getStock.should.be.an.instanceOf(Function);
    db.getKeyword.should.be.an.instanceOf(Function);
    db.deleteStock.should.be.an.instanceOf(Function);
    db.deleteKeyword.should.be.an.instanceOf(Function);
    db.addKeywordToKeyword.should.be.an.instanceOf(Function);
    db.testDbConnection.should.be.an.instanceOf(Function);
  });

  // Test connecting to database
  it("should connect to database", function(done) {
    this.timeout(10000);
    return db.testDbConnection()
    .should.be.fulfilled()
    .then(function(res) {
      res.should.equal(true);
      done();
    });
  });

  // Test stock saving to neo4j
  describe('Save and retrieve stocks', function() {
    // Wipe DB after testing
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

    it('should retrieve stock from database', function(done) {
      return db.getStock({tag: "AAPL"})
      .should.be.fulfilled()
      .then(function(result) {
        result.should.be.an.instanceOf(Array).and.have.lengthOf(1);
        result[0].Stock.should.equal('Apple Inc.');
        result[0].date.should.be.an.instanceOf(Array).and.have.lengthOf(4);
        result[0].id.should.be.an.instanceOf(Number);
        result[0].tag.should.equal("AAPL");
        done();
      });
    });

  });

  // Test keyword saving to neo4j
  describe('Save and retrieve keywords', function() {
    // Wipe DB after testing
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

    it('should retrieve keyword from database', function(done) {
      return db.getKeyword({Keyword: "tea"})
      .should.be.fulfilled()
      .then(function(result) {
        result.should.be.an.instanceOf(Array).and.have.lengthOf(1);
        result[0].Keyword.should.equal('tea');
        result[0].date.should.be.an.instanceOf(Array).and.have.lengthOf(4);
        result[0].id.should.be.an.instanceOf(Number);
        done();
      });
    });

  });

  describe('Save and retrieve generic items', function() {
    // Wipe DB after testing
    after(wipeDB);

    it('should save generic item with Label to database', function(done) {
      return db.saveItem({Type: "Cow"}, 'Animal')
      .should.be.fulfilled()
      .then(function(result) {
        result.should.be.an.instanceOf(Object);
        seraph.find({Type: "Cow"}, function(err, animal) {
          should.not.exist(err);
          animal.should.be.an.instanceOf(Array).and.have.lengthOf(1);
          animal[0].Type.should.equal('Cow');
          animal[0].id.should.be.an.instanceOf(Number);
          done();
        });
      });
    });

  });

  describe('Should save and retrieve Keyword relationships', function() {
    // Wipe DB after testing
    after(wipeDB);

    // Variables to test against
    var wolfId  = 0,
        batId   = 1,
        catId   = 2,
        sheepId = 3;

    // Initialize database with keywords
    before(function(done) {
      seraph.save({Keyword: "Sheep"}, 'Keyword', function(err, node) {
        sheepId = node.id;
        seraph.save({Keyword: "Bat"}, 'Keyword', function(err, node) {
          batId = node.id;
          seraph.save({Keyword: "Cat"}, 'Keyword', function(err, node) {
            catId = node.id;
            seraph.save({Keyword: "Wolf"}, 'Keyword', function(err, node) {
              wolfId = node.id;
              done();
            });
          });
        });
      });
    });

    it('should add relationships between nodes', function(done) {
      return db.addKeywordToKeyword({Keyword: "Wolf"}, {Keyword: "Sheep"}, {rel: true, corr: 67})
      .should.be.fulfilled()
      .then(function(relationship) {
        relationship.start.should.equal(wolfId);
        relationship.end.should.equal(sheepId);
        relationship.type.should.equal('correlates');
        relationship.id.should.be.an.instanceOf(Number);
        relationship.properties
        .should.be.an.instanceOf(Object)
        .and.deepEqual({ correlation: 67, relevance: true });
      })
      .then(function() {
        db.addKeywordToKeyword({Keyword: "Wolf"}, {Keyword: "Bat"}, {corr: 34, rel: false})
        .should.be.fulfilled()
        .then(function(relationship) {
          relationship.start.should.equal(wolfId);
          relationship.end.should.equal(batId);
          relationship.type.should.equal('correlates');
          relationship.id.should.be.an.instanceOf(Number);
          relationship.properties
          .should.be.an.instanceOf(Object)
          .and.deepEqual({ correlation: 34, relevance: false });
          done();
        });
      });
    });

    it("should retrieve a node's relationships", function(done) {
      return db.getNamesOfRelationships({Keyword: "Wolf"})
      .should.be.fulfilled()
      .then(function(results) {
        results.should.be.an.instanceOf(Array).and.have.lengthOf(2);
        results[0].should.have.properties(['Keyword', 'corr', 'rel', 'data']);
        results[1].should.have.properties(['Keyword', 'corr', 'rel', 'data']);
        results[0].corr.should.be.above(results[1].corr);
        done();
      });
    });

  });

});
