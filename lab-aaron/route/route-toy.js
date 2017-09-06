'use strict';

const Toy = require('../model/toy');
const storage = require('../lib/storage');
const response = require('../lib/response');
const debug = require('debug')('http:route-toy');

module.exports = function(router) {

  router.post('/api/toy', (req, res) => {
    debug('/api/toy POST');
    if(!req.body.name || !req.body.desc){
      response.sendText(res, 400, 'Bad request; must have name and desc');
      return;
    }
    try {
      let newToy = new Toy(req.body.name, req.body.desc);
      storage.create('toy', newToy)
        .then(toy => response.sendJson(res, 201, toy));
    } catch(e) {
      console.error(e);
      res.sendText(res, 400, `bad request: ${e.message}`);
    }
  });

  router.get('/api/toy', (req, res) => {
    debug('/api/toy GET');
    if(req.url.query._id) {
      storage.fetchOne('toy', req.url.query._id)
        .then(toy => response.sendJson(res, 200, toy))
        .catch(e => {
          console.error(e);
          res.sendText(400, `bad request: ${e.message}`);
        });
      return;
    }
    response.sendText(res, 400, `bad request; could not find record`);
  });

  router.delete('/api/toy', (req, res) => {
    debug('api/toy DELETE');
    if(req.url.query._id) {
      response.sendText(res, 404, 'bad request; unable to delete');
      return;
    }
    storage.delete('toy', req.url.query._id)
      .then(toy => {
        response.sendText(res, 204, `deleted toy id#; ${toy}`);
      })
      .catch(e => {
        console.error(e);
        response.sendText(res, 404, `bad request; unable to locate record`);
      });
    return;
  });

  router.put('/api/toy'), (req, res) => {
    debug('/api/toy PUT');
    if (!req.url.query._id) {
      response.sendText(res, 400, 'bad request; no id exists');
      return;
    }
    let newToy = req.body;
    storage.put('toy', newToy)
      .then(toy => response.sendJson(res, 204, toy))
      .catch(e => {
        console.error(e);
        response.sendText(res, 400, `bad request; ${e.message}`);
      });
  };
};
