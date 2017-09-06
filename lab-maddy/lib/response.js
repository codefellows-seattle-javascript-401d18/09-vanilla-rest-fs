'use strict';

const debug = require('debug')('http:response');

let response = module.exports = {};

response.sendJson = function(res, status, data) {
  debug('no more json');
  res.writeHead(status, {'Content-Type': 'application/json'});
  res.write(JSON.stringify(data));
  res.end();
};

response.sendText = function (res, status, data) {
  res.writeHead(status, {'Content-Type': 'text/plain'});
  res.write(data);
  res.end();
};

// response.respond = function(res, status, data) {
//   try (
//     let json = JSON.stringify(data)
//     res.writeHead(status, {'Content-Type': 'application/json'})
//     res.write(json)
//     res.end()
//   )
//
// }
