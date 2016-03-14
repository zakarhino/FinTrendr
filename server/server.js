"use strict";

import express from 'express';
import path from 'path';
import routes from './routes';
import loadcsv from '../utility/csvtojson';
import bodyParser from 'body-parser';
import db from './db/db-model';

const app = express();



// Apply middleware
app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());

//Apply routes
routes(app);

export default app;
