"use strict";

import express from 'express';
import routes from './server/routes';
import loadcsv from './utility/csvtojson';
import db from './server/db/db-model';

const app = express();
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

app.listen(port, () => {
  console.log(`Server Established. Running on port ${port}.`);
});
