'use strict';

module.exports = exports = {};

exports.sendJSON = function(res, status, data) {
  res.writeHead(status, { 'Content-Type': 'application/json'});
  res.write(JSON.stringfy(data));
  res.end();
};

exports.sendText = function (res, status, msg) {
  res.writeHead(status, { 'Content-Type': 'application/json'});
  res.write(JSON.stringify(msg));
  res.end();
};



'use strict';

const debug = require('debug')('http:response');

let response = module.exports = {};

response.sendJson = function(res, status, data) {
  debug('say bye json!');
  res.writeHead(status, {'Content-Type': 'application/json'});
  res.write(JSON.stringify(data));
  res.end();
};

response.sendText = function(res, status, data) {
  debug('say bye text!');
  res.writeHead(status, {'Content-Type': 'text/plain'});
  res.write(data);
  res.end();
};
