'use strict';

const debug = require('debug')('http:response');

//Note to self: instead of making two methods like before, this one implements a try/catch to figure out which is which. We pass in the res, status and data and use those further down in the try/catch.//
module.exports = function(res, status, data) {
  try {
    debug('#Json version response');
    let json = JSON.stringify(data);
    res.writeHead(status, {'Content-Type': 'application/json'});
    res.write(json);
    res.end();
  } catch(e) {
    debug('#Text version response');
    res.write(status, {'Content-Type': 'text/plain'});
    res.write(data);
    res.end();
  }
};

//What I had previously:
// response.sendJson = function(res, status, data) {
//   debug('say bye Json!');
//   res.writeHead(status, {'Content-Type': 'application/json'});
//   res.write(JSON.stringify(data));
//   res.end();
// };
//
// response.sendText = function(res, status, data) {
//   debug('say bye text!');
//   res.writeHead(status, {'Content-Type': 'text/plain'});
//   res.write(data);
//   res.end();
// };
