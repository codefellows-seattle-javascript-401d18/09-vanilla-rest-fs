'use strict';

const Toy = require('../model/toy');
const storage = require('../lib/storage');
const response = require('../lib/response');
const debug = require('debug')('http:route-toy');

module.exports = function (router) {

  router.post('/api/toy', (req, res) => {
    debug('/api/toy POST');

    try {
      return storage.create('toy', req.body)
        .then(toy => response(res, 201, toy));
    } catch(err) {
      response(res, 400, `bad request: could not create toy`);
    }
  });

  router.get('/api/toy', (req, res) => {
    debug('/api/toy GET');
    if (req.url.query._id) {
      return storage.fetchOne('toy', req.url.query._id)
        .then(toy => {
          return response(res, 200, toy);
        })
        .catch(err =>  {
          return response(res, 400, err.message);
        });
    }
    return storage.fetchAll('toy')
      .then(ids => response(res, 200, ids))
      .catch(err => response(res, 404, err.message));
  });

  router.put('/api/toy', (req, res) => {
    debug ('/api/toy PUT');
    if (!req.url.query._id) {
      return storage.create('toy', req.body)
        .then(toy => response(res, 201, toy))
        .catch(() => response(res, 400, 'bad request: cannot update toy'));
    }
    return storage.update('toy', req.body, req.url.query._id)
      .then(() => response(res, 204))
      .catch(err => response(res, 400, err.message));
  });

  router.delete('/api/toy', (req, res) => {
    debug('/api/data DELETE');

    if(req.url.query._id) {
      return storage.destroy('toy', req.url.query._id)
        .then(() => response(res, 204))
        .catch(err => response(res, 404, err.message));
    }
    response(res, 400, 'bad request: could not delete resource');
  });
};
