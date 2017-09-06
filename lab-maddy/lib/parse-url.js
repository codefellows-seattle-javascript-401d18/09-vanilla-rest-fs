'use strict';

const debug = require('debug')('http:parse-url');//runs when hits whats in the 2nd pars
const urlParse = require('url').parse;
const queryParse = require('querystring').parse;


module.exports = function(req) { //we would not expect a reject case in this scenario
  debug('#parse-url');
  req.url = urlParse(req.url);
  req.url.query = queryParse(req.url.query);
  return Promise.resolve(req);//return that promise and pass the request through.
  
  // return new Promise((resolve, reject) => {
//   req.url = urlParse(req.url)
//   req.url.query = queryParse(req.url.query)
//   return resolve(req)
// })
};
