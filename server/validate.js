"use strict";

const cheerio = require('cheerio');
const request = require('request');
const natural = require('natural');
const parser  = require('rss-parser');

// https://news.google.com/news/section?q=clinton+drilling&output=rss

const validate = (keyword, item) => {
  const url = `https://news.google.com/news/section?q=${keyword}+${item}&output=rss`;
  const tfidf = new natural.TfIdf();
  return new Promise((resolve, reject) => {
    parser.parseURL(url, (err, parsed) => {
      if(parsed.feed === undefined) {
        resolve(false);
      }
      parsed.feed.entries.forEach((item) => {
        let parsed = cheerio.load(item.content)('table').text();
        tfidf.addDocument(parsed);
      });
      let count = 0, appeared = 0;
      tfidf.tfidfs([keyword, item], (i, measure) => {
        count += measure;
        if(measure > 0.7) appeared++;
      });
      if(count > 9 && appeared > 4) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
};

module.exports = validate;
