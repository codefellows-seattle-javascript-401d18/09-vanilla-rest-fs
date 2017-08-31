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
