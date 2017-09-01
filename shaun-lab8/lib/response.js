'use strict';

const debug = require('debug')('http:response');


module.exports = exports = {};

exports.sendJSON = function(res, status, data) {
  debug('JSON Sent');
  res.writeHead(status, { 'Content-Type': 'application/json'});
  res.write(JSON.stringfy(data));
  res.end();
};

exports.sendText = function (res, status, msg) {
  debug('Text Sent');
  res.writeHead(status, { 'Content-Type': 'application/json'});
  res.write(JSON.stringify(msg));
  res.end();
};
