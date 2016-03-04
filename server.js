"use strict";

const express = require('express');
const app = express();
const routes = require('./server/routes');
const loadcsv = require('./utility/csvtojson');
const db = require('./server/db/db-model');
// const dbtest = require('./server/db/db-test');
routes(app);

// loadcsv('goldenticket.csv')
//   .then((data) => {
//     for(var i =0; i<data.length; i++) {
//       db.saveKeyword(data[i]).then((node)=> {console.log('done!');}).catch((err)=> {console.log(err);});
//     }
//   })
//   .catch(() => {
//     console.log('failed to parse data');
//   });


const port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log('Server Established. Running on port ' + port);
});
