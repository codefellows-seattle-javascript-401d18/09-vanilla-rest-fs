'use strict';

const Toy = require('../model/toy');
const storage = require('../lib/storage');
const response = require('../lib/response');
const debug = require('debug')('http:route-toy');

module.exports = function (router) {

  router.delete('/api/toy', (req, res) => {
    debug('/api/data DELETE');
    try {
      if(req.url.query._id) {
        return storage.destroy('toy', req.url.query._id)
          .then(response(res, 204, 'toy destroyed'));
      }
    } catch (e) {
      response.sendText(res, 400, 'bad request: cannot delete this stuff');
    }
  });

  router.post('/api/toy', (req, res) => {
    debug('/api/toy POST');
    try {
      let newToy = new Toy(req.body.name, req.body.desc);
      return storage.create('toy', newToy)
        .then(toy => response.sendJson(res, 201, toy));
    } catch (e) {
      response.sendText(res, 400, `bad request: ${e.message}`);
    }
  });


  //May need to update//
  router.get('/api/toy', (req, res) => {
    debug('/api/toy GET');
    if (req.url.query._id) {
      storage.fetchOne('toy', req.url.query._id)
        .then(toy => {
          response(res, 201, toy);
        })
        .catch(err => {
          response(res, 404, 'bad request: could not find record');
        });
      return;
    }
  });

  router.put('/api/toy', (req, res) => {
    debug ('/api/toy PUT');
    if (!req.url.query._id) {
      try {
        let newToy = new Toy(req.body.name, req.body.desc);
        return storage.create('toy', newToy)
          .then(response(res, 400, 'toy creeated'));
      } catch(e) {
        response(res, 400, 'bad request: cannot update toy');
      }
      return;
    }
    return storage.update('toy', req.body)
      .then(response(res, 204, 'toy updated'))
      .catch(err => response(res, 400, err.message));
  });
};
