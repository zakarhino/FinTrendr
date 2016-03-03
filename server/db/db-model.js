"use strict";

const db = require("seraph")({
  user: 'neo4j',
  pass: 'cool'
});

/**
 * Saves stock to DB and passes saved object to callback
 * @param  {Object}   stock  Stock object
 * @return {Function}        Callback function
 */
let saveStock = (stock) => {
  return new Promise((resolve, reject) => {
    db.save(stock, 'Stock', (err, node) => {
      if (err) reject(err);
      resolve(node);
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
    db.save(keyword, 'Keyword', (err, node) => {
      if (err) reject(err);
      resolve(node);
    });
  });
};

/**
 * Gets stock from DB and passes it into callback
 * @param  {Object}   stock  Name of the stock
 * @param  {Function} cb     Callback function
 * @return {Function}        Callback function
 */
let getStock = (stock) => {
  return new Promise((resolve, reject) => {
    db.find(stock, 'Stock', (err, node) => {
      if (err) reject(err);
      resolve(node);
    });
  });
};

/**
 * Gets keyword from DB and passes it into callback
 * @param  {Object}    keyword  Keyword object
 * @param  {Function}  cb       Callback function
 * @return {Function}           Callback function
 */
let getKeyword = (keyword) => {
  return new Promise((resolve, reject) => {
    db.find(keyword, 'Keyword', (err, node) => {
      if (err) reject(err);
      resolve(node);
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
            console.log("Deleted stock.");
            resolve();
          })
          .catch((err) => {
            console.log("Error deleting stock:");
            reject(err);
          });
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
      .then(() => {
        console.log("Deleted keyword.");
        resolve();
      })
      .catch((err) => {
        console.log("Error deleting keyword:");
        reject(err);
      });
  });
};

/**
 * Deletes item from DB
 * @param  {Object} item Seraph node object
 * @return {Function}    Resolve/reject function
 */
let deleteItem = (item) => {
  return new Promise((resolve, reject) => {
    db.delete(node, (err) => {
      if (err) return reject(err);
      return resolve();
    });
  });
};

let addRelationship = (keyword, stock, correlation) => {
  return new Promise((resolve, reject) => {
    Promise.all([getStock(stock), getKeyword(keyword)])
      .then(function(results) {
        db.relate(keyword, 'relates', stock, { correlation }, (err, rel) => {
          if (err) reject(err);
          resolve(rel);
        });
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
  addRelationship: addRelationship
};
