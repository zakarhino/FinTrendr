"use strict";

const config = require('../../utility/common').config();

const db = require("seraph")({
  server: config.neo4j.server,
  user: config.neo4j.user,
  pass: config.neo4j.password
});

/**
 * Saves stock to DB and passes saved object to callback
 * @param  {Object}   stock  Stock object
 * @return {Function}        Promise object
 */
let saveStock = (stock) => {
  return new Promise((resolve, reject) => {
    saveItem(stock, 'Stock')
      .then((node) => {
        return resolve(node);
      })
      .catch((err) => {
        console.log("Error with saveStock:", err);
        return reject(err);
      });
  });
};

/**
 * Saves keyword to DB and passes saved object to callback
 * @param  {Object}   keyword  Keyword object
 * @return {Object}            Promise object
 */
let saveKeyword = (keyword) => {
  return new Promise((resolve, reject) => {
    saveItem(keyword, 'Keyword')
      .then((node) => {
        return resolve(node);
      })
      .catch((err) => {
        return reject(err);
      });
  });
};

// /**
//  * Saves term to DB and passes saved object to callback
//  * @param  {Object} term Term object
//  * @return {Object}      Promise object
//  */
// let saveTerm = (term) => {
//   return new Promise((resolve, reject) => {
//     saveItem(term, 'Term')
//       .then((node) => {
//         return resolve(node);
//       })
//       .catch((err) => {
//         return reject(err);
//       });
//   });
// };

/**
 * Saves item to DB and passes saved object back to caller function
 * @param  {Object} item Item to add
 * @param  {String} type Label of item you're adding
 * @return {Function}    Resolve function
 */
let saveItem = (item, type) => {
  return new Promise((resolve, reject) => {
    db.save(item, type, (err, node) => {
      if (err) return reject(err);
      return resolve(node);
    });
  });
};

/**
 * Gets stock from DB and passes it into callback
 * @param  {Object}   stock  Name of the stock
 * @return {Object}        Promise object
 */
let getStock = (stock) => {
  return new Promise((resolve, reject) => {
    db.find(stock, 'Stock', (err, node) => {
      if (err) return reject(err);
      return resolve(node);
    });
  });
};

/**
 * Gets keyword from DB and passes it into callback
 * @param  {Object}    keyword  Keyword object
 * @return {Object}           Promise object
 */
let getKeyword = (keyword) => {
  return new Promise((resolve, reject) => {
    db.find(keyword, 'Keyword', (err, node) => {
      if (err) return reject(err);
      return resolve(node);
    });
  });
};

let getNamesOfRelationships = (keyword) => {
  return new Promise((resolve, reject) => {
    let cypher = "MATCH (n:Keyword { Keyword: '" + keyword.Keyword +"' })-[r:correlates]->(node) RETURN node, r ORDER BY r.correlation DESC";
    db.query(cypher, (err, res) => {
      if (err) return reject(err);
      var out = [];
      for(var x = 0; x < res.length; x++) {
        out.push({
          "keyword": res[x].node.Keyword,
          "correlation": res[x].r.properties.correlation
        });
      }
      return resolve(out);
    });
  });
};

// /**
//  * Gets term from DB and passes it into callback
//  * @param  {Object} term String object
//  * @return {Object}      Promise object
//  */
// let getTerm = (term) => {
//   return new Promise((resolve, reject) => {
//     db.find(term, 'Term', (err, node) => {
//       if (err) return reject(err);
//       return resolve(node);
//     });
//   });
// };

/**
 * Generic get item from DB function
 * @param  {[type]} item Raw item to get
 * @param  {[type]} term Label of item to get
 * @return {[type]}      [description]
 */
let getItem = (item, term) => {
  return new Promise((resolve, reject) => {
    db.find(item, term, (err, node) => {
      if (err) return reject(err);
      return resolve(node);
    });
  });
};

/**
 * Deletes stock from DB
 * @param  {Object}  stock  Stock object
 * @return {Object}         Promise object
 */
let deleteStock = (stock) => {
  return new Promise((resolve, reject) => {
    getStock(stock)
      .then((node) => {
        deleteItem(node)
          .then(() => {
            return resolve();
          })
          .catch((err) => {
            return reject(err);
          });
      })
      .catch((err) => {
        return reject(err);
      });
  });
};

/**
 * Deletes keyword from DB
 * @param  {Object}  keyword  Keyword object
 * @return {Object}           Promise object
 */
let deleteKeyword = (keyword) => {
  return new Promise((resolve, reject) => {
    getKeyword(keyword)
      .then((node) => {
        deleteItem(node)
          .then(() => {
            return resolve();
          })
          .catch((err) => {
            return reject(err);
          });
      })
      .catch((err) => {
        return reject(err);
      });
  });
};

// /**
//  * Deletes term fromm DB
//  * @param  {Object} term Term object
//  * @return {Object}      Promise object
//  */
// let deleteTerm = (term) => {
//   return new Promise((resolve, reject) => {
//     getTerm(term)
//       .then((node) => {
//         deleteItem(node)
//           .then(() => {
//             return resolve();
//           })
//           .catch((err) => {
//             return reject(err);
//           });
//       })
//       .catch((err) => {
//         return reject(err);
//       });
//   });
// };

/**
 * Deletes item from DB
 * @param  {Object}    item  Seraph node object
 * @return {Function}        Resolve/reject function
 */
let deleteItem = (item) => {
  return new Promise((resolve, reject) => {
    db.delete(node, (err) => {
      if (err) return reject(err);
      return resolve();
    });
  });
};

let addKeywordToKeyword = (first, second, correlation) => {
  return new Promise((resolve, reject) => {
    Promise.all([getKeyword(first), getKeyword(second)])
      .then(function(results) {
        console.log(results);
        db.relate(results[0][0], 'correlates', results[1][0], { correlation: correlation }, (err, rel) => {
          if (err) return reject(err);
          return resolve(rel);
        });
      })
      .catch((err) => {
        console.log("ERROR:", err);
      });
  });
};

let testDbConnection = () => {
  return new Promise((resolve, reject) => {
    db.save({ test: "Object!" }, (err, node) => {
      if (err) {
        console.log("Connection Error:", err);
        return reject(err);
      } else {
        db.delete(node, (err) => {
          if (err) {
            console.log("Connection Error:", err);
            return reject(err);
          }
          return resolve(true);
        });
      }
    });
  });
};

module.exports = {
  saveStock: saveStock,
  saveKeyword: saveKeyword,
  getStock: getStock,
  getKeyword: getKeyword,
  getNamesOfRelationships: getNamesOfRelationships,
  deleteStock: deleteStock,
  deleteKeyword: deleteKeyword,
  addKeywordToKeyword: addKeywordToKeyword,
  testDbConnection: testDbConnection,
  db: db
};
