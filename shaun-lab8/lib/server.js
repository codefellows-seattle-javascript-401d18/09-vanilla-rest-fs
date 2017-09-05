'use strict';

const debug = require('debug')('http:server');

const PORT = process.env.PORT || 3000;
const express = require ('express');
const router = express.Router();
const app = module.exports = express();


const http = require('http');
const bodyParser = require('body-parser');
const cors = require('./cors');
const errorMiddleware = require('./error-middleware');

require('./route/route-toy')(router);
// require('./route/route-kid')(router)
// require('./route/route-family')(router)

app.use(bodyParser);
app.use(cors);
app.use(http);
app.use(errorMiddleware);
