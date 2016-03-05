"use strict";

const db = require('./db-model.js');

console.log("Running db-test.js...");

// db.addKeywordToKeyword({ Keyword: "handbags" }, { Keyword: "lottery" }, 0.1294)
// .then(() => {
//   console.log("added lottery");
// });
// db.addKeywordToKeyword({ Keyword: "handbags" }, { Keyword: "teen fashion" }, 0.539582)
// .then(() => {
//   console.log("added teen fashion");
// });
// db.addKeywordToKeyword({ Keyword: "handbags" }, { Keyword: "tea" }, 0.78322341)
// .then(() => {
//   console.log("added tea");
// });

db.getNamesOfRelationships({Keyword: "handbags"})
.then((res) => {
  console.log("RES:", res);
})
.catch((err) => {
  console.log("ERR:", err);
});

// dbModel.save
