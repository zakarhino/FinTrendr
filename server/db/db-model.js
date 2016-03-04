"use strict";

const db = require("seraph")({
  user: 'neo4j',
  pass: 'saric999'
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

/**
 * Saves term to DB and passes saved object to callback
 * @param  {Object} term Term object
 * @return {Object}      Promise object
 */
let saveTerm = (term) => {
  return new Promise((resolve, reject) => {
    saveItem(term, 'Term')
    .then((node) => {
      return resolve(node);
    })
    .catch((err) => {
      return reject(err);
    });
  });
};

let saveItem = (item, type) => {
  return new Promise((resolve, reject) => {
    db.save(item, type, (err, node) => {
      if(err) return reject(err);
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

/**
 * Gets term from DB and passes it into callback
 * @param  {Object} term String object
 * @return {Object}      Promise object
 */
let getTerm = (term) => {
  return new Promise((resolve, reject) => {
    db.find(term, 'Term', (err, node) => {
      if (err) return reject(err);
      return resolve(node);
    });
  });
};

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

/**
 * Deletes term fromm DB
 * @param  {Object} term Term object
 * @return {Object}      Promise object
 */
let deleteTerm = (term) => {
  return new Promise((resolve, reject) => {
    getTerm(term)
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

let addRelationship = (correlation, keyword, stock) => {
  return new Promise((resolve, reject) => {
    Promise.all([getStock(stock), getKeyword(keyword)])
      .then(function(results) {
        db.relate(keyword, 'relates', stock, { correlation }, (err, rel) => {
          if (err) return reject(err);
          return resolve(rel);
        });
      });
  });
};

let testDbConnection = () => {
  return new Promise((resolve, reject) => {
    db.save({ test: "Object!" }, (err, node) => {
      if(err) return reject(err);
      else {
        console.log("Saved test object!");
        db.delete(node, (err) => {
          if(err) return reject(err);
          console.log("Deleted test object!");
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
  deleteStock: deleteStock,
  deleteKeyword: deleteKeyword,
  addRelationship: addRelationship,
  testDbConnection: testDbConnection,
  db: db
};
