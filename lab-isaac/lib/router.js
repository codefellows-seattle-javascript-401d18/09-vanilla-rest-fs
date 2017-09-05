'use strict';

const debug = require('debug')('http:router');
const parseUrl = require('./parse-url');
const parseJson = require('./parse-json');
const response = require('./response');

const Router = module.exports = function() {
  this.routes = {
    GET: {
      // '/cowsay': (req, res) => { // do a thing },
      // '/toy': (req, res) => { // do a thing }
      // '/kid': 'hello world' // this would not validate in our server callback
    },
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
  this.routes.delete[endpoint] = callback;
};

Router.prototype.route = function() {
  return (req, res) => {
    debug('Contact made!!!');
    Promise.all([
      parseUrl(req),
      parseJson(req),
    ])
      .then(() => {
        if(typeof this.routes[req.method][req.url.pathname] === 'function') {
          debug(`Request recieved:; ${req.url.pathname} ${req.method}`);
          this.routes[req.method][req.url.pathname](req, res);
          return;
        }
        response.sendText(res, 404, 'route not found');
        // res.writeHead(404, {'Content-Type': 'text/plain'});
        // res.write('route not found');
        // res.end();
      })
      .catch(err => {
        debug(`Houston, we have a problem: \n${err.message}`);

        response.sendText(res, 400, 'bad request; something went wrong in the router');
        // res.writeHead(400, {'Content-Type': 'text/plain'});
        // res.write('bad request; something went wrong in the router');
        // res.end();
      });
  };
};
