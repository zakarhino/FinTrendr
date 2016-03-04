var express = require('express');
var path = require('path');

var bodyParser = require('body-parser');

var KeywordController = require('./controller.js');

module.exports = function(app) {

  // Log all incoming requests
  app.all('*', function(req, res, next) {
    console.log(req.method, 'Request for URL ', req.url);
    next();
  });

  app.use(bodyParser.json());
  app.use(express.static(path.join(__dirname, '../public')));

  // Keyword API route
  app.get('/api/', KeywordController.getResult);
};
