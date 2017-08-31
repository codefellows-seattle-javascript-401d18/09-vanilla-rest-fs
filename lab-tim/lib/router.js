'use strict';

const debug = require('debug')('http:router');
const parseUrl = require('./parse-url');
const parseJson = require('./parse-json');

const Router = module.exports = function() {
  this.routes = {
    GET: {},
    POST: {},
    PUT: {},
    DELETE: {}
  };
};

Router.prototype.get = function(endpoint, callback) {
  // debug('#Router.get')
  this.routes.GET[endpoint] = callback;
};

Router.prototype.post = function(endpoint, callback) {
  this.routes.POST[endpoint] = callback;
};

Router.prototype.put = function(endpoint, callback) {
  this.routes.PUT[endpoint] = callback;
};

Router.prototype.delete = function(endpoint, callback) {
  this.routes.DELETE[endpoint] = callback;
};

Router.prototype.route = function() {
  return (req, res) => {
    debug('Server has been accessed by someone');
    Promise.all([
      parseUrl(req),
      parseJson(req)
    ])
      .then(() => {
        if(typeof this.routes[req.method][req.url.pathname] === 'function') {
          debug(`Request received: ${req.url.pathname} ${req.method}`);
          this.routes[req.method][req.url.pathname](req, res);
          return;
        }

        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.write('route not found');
        res.end();
      })
      .catch(err => {
        debug(`Router error: \n${err.message}`);

        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.write('bad request; something went wrong in the router');
        res.end();
      });
  };
};
