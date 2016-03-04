"use strict";

const should = require('should');
const db = require('../server/db/db-model.js');
// const request = require("supertest-as-promised");

describe('DB Model', function() {
  xit("should contain db object", () => {
    should.exist(db);
  });

  xit("should contain all DB utility Promise functions", () => {
    (db.saveStock).should.be.a.Function();
    (db.saveKeyword).should.be.a.Function();
    (db.getStock).should.be.a.Function();
    (db.getKeyword).should.be.a.Function();
    (db.deleteStock).should.be.a.Function();
    (db.deleteKeyword).should.be.a.Function();
    (db.addRelationship).should.be.a.Function();
    (db.testDbConnection).should.be.a.Function();
  });

  xit("should connect to database", () => {
    db.testDbConnection().should.be.fulfilledWith(true);
  });

  xit("should fulfill a promise", (done) => {
    return (new Promise((resolve, reject) => { resolve(10); }))
      .then((val) => {
        (val).should.be.equal(11);
      })
      .call(done);
  });
});