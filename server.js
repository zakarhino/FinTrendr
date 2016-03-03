"use strict";

const express = require('express')
const app = express();
const routes = require('./server/routes');

const db = require('./server/db/db.js');

routes(app);

const port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log('Server Established. Running on port ' + port);
})
