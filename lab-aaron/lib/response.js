'use strict';

const debug = require('debug')('http:response');

let response = module.exports = {};

response.sendJson = function(res, status, data){
  debug('Goodbye Json');
  res.writeHead(status, {'Content-Type': 'application/json'});
  res.write(JSON.stringify(data));
  res.end();
};

response.sendText = function(res, status, data){
  debug('Bye Text');
  res.writeHead(status, {'Content-Type': 'text/plain'});
  res.write(data);
  res.end();
};
