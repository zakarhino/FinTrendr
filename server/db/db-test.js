"use strict";

const db = require('./db-model.js');

console.log("Running db-test.js...");

db.addKeywordToKeyword({Keyword: "handbags"}, {Keyword: "catering"}, 0.341665)
.then((saved) => {
  console.log("Saved:", saved);
});

db.getCorrelations({Keyword: "handbags"})

// dbModel.save