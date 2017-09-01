'use strict';

const Toy = require('../model/toy');
const storage = require('../lib/storage');
const response = require('../lib/response');
const debug = require('debug')('http:route-toy');

module.exports = function (router) {

//FIX THIS ONCE STORAGE.DELETE IS DONE;
  router.delete('/api/data', (req, res) => {
    debug('/api/data DELETE');
    try {
      // storage.delete(//some things//)
      // .then(//something => response.sendText(res, 201, something))
    } catch (e) {
      console.error(e);
      response.sendText(res, 400, 'bad request: cannot delete this stuff');
    }
  });

  router.post('/api/toy', (req, res) => {
    debug('/api/toy POST');
    try {
      let newToy = new Toy(req.body.name, req.body.desc);
      storage.create('toy', newToy)
        .then(toy => response.sendJson(res, 201, toy));
    } catch (e) {
      console.error(e);
      response.sendText(res, 400, `bad request: ${e.message}`);
      //check if return is necessary here
    }
  });

  router.get('/api/toy', (req, res) => {
    debug('/api/toy GET');
    if (req.url.query._id) {
      storage.fetchOne('toy', req.url.query._id)
        .then(toy => {
          response.sendJson(res, 200, toy);
        })
        .catch(err => {
          console.error(err);
          response.sendText(res, 400, 'bad request: could not find record');
        });
      return;
    }
    response.sendText(res, 400, 'bad request: item id required to get record');
    return; //do we need this?
  });

  router.put('/api/toy', (req, res) => {
    debug('/api/toy PUT');
    if (req.url.query._id) {
      if(!req.body._id && !req.body.desc) {
        response.sendJson(res, 400, `bad request: body improperly formatted`);
        return;
      }
      storage.update('toy', req.body)
        .then(()=> {
          // response.sendText(res, 204, '') - need to look at this
          res.write(204, {'Content-Type': 'text/plain'});
          res.end();
          return;
        })
        .catch(err => {
          response.sendJson(res, 400, `bad request: ${err.message}`);
          // res.writeHead(400, {'Content-Type': 'application/json'});
          // res.write(`bad request: ${err.message}`);
          // res.end();
          return;
        });
      return;
    }
    response.sendText(res, 400, 'bad request: item id required to get record');
    // res.writeHead(400, {'Content-Type': 'text/plain'});
    // res.write('bad request: item id required to get record');
    // res.end();
  });
};
