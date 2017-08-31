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
  debug('#Router.get');
  this.routes.GET[endpoint] = callback;
};

Router.prototype.post = function(endpoint, callback) {
  debug('#Router.post');
  this.routes.POST[endpoint] = callback;
};

Router.prototype.put = function(endpoint, callback) {
  debug('#Router.put');
  this.routes.PUT[endpoint] = callback;
};

Router.prototype.delete = function(endpoint, callback) {
  debug('#Router.delete');
  this.routes.DELETE[endpoint] = callback;
};

Router.prototype.route = function() {
  return (req, res) => {
    Promise.all([
      parseUrl(req),
      parseJson(req)
    ])
      .then(() => {
        if(typeof this.routes[req.method][req.url.pathname] === 'function') {
          this.routes[req.method][req.url.pathname](req, res);
          return;
        }

        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.write('route not found');
        res.end();
      })
      .catch(err => {
        debug(`We have an issue: \n${err.message}`);

        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.write('bad request; something went wrong in the router');
        res.end();
      });
  };
};
