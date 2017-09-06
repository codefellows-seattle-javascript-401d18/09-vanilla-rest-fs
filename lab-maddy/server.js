'use strict';

const debug = require('debug')('http:server');
const http = require('http');
const Router = require('./lib/router');
const router = new Router();
const PORT = process.env.PORT || 3000;

require('./route/route-toy')(router); //state is managed here
// require('./route/route-kid')(router)
// require('./route/route-family')(router)

const server = module.exports = http.createServer(router.route());//to see what happens when we callt this see router.js for the big function callback.

server.listen(PORT, () => debug(`Listening on ${PORT}`));

// TODOs:
// 1. Create a RESTful API using only vanilla JS and Node
// 2. Modularize our code, and use best practices for separating concerns
// 3. Have a single 'in-memory' resource/model for persistence (only while server is running)
// 4. Recreate the basic functionality of ExpressJS as a Router

// Demo today will complete GET and POST functionality. Students will complete PUT, DELETE, DOCS, and TESTS


// in terminal npm run start: debug
// in other windwo-- http POST :3000/api/toy name=barney desc='purple dino'

//should get that 201 status, and an object with those three key values
