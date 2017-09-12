'use strict';

const debug = require('debug')('http:router');
const parseUrl = require('./parse-url');
const parseJson = require('./parse-json');
const response = require('./response');

const Router = module.exports = function() {
  this.routes = {
    GET: {},
    POST: {},
    PUT: {},
    DELETE: {},
  };
};

Router.prototype.get = function(endpoint, callback) {
  debug(`#Router: mounted ${endpoint} GET`);
  this.routes.GET[endpoint] = callback;
};

Router.prototype.post = function(endpoint, callback) {
  debug(`#Router: mounted ${endpoint} POST`);
  this.routes.POST[endpoint] = callback;
};

Router.prototype.put = function(endpoint, callback) {
  debug(`#Router: mounted ${endpoint} PUT`);
  this.routes.PUT[endpoint] = callback;
};

Router.prototype.delete = function(endpoint, callback) {
  debug(`#Router: mounted ${endpoint} DELETE`);
  this.routes.DELETE[endpoint] = callback;
};

Router.prototype.route = function() {
  return (req, res) => {
    debug('Someone knows I exist! They have made contact!!');
    Promise.all([
      parseUrl(req),
      parseJson(req),
    ])
      .then(() => {
        if(typeof this.routes[req.method][req.url.pathname] === 'function') {
          debug(`Houston, we've received a request: ${req.url.pathname} ${req.method}`);
          this.routes[req.method][req.url.pathname](req, res);
          return;
        }

        response.sendText(res, 400, 'router not found');
      })
      .catch(err => {
        debug(`Houston, we have a problem: \n${err.message}`);

        console.log(err)

        response.sendText(res, 400, 'bad request; something is wrong in the router');
      });
  };
};
