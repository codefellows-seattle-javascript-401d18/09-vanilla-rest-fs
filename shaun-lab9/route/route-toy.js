'use strict';
const storage = require('../lib/storage');
const debug = require('debug')('http:route-toy');
const createError = require('http-errors');

module.exports = function(router) {
  router.post('/api/toy', (req, res, next) => {
    debug('/api/toy POST');

    return storage.create(req.body)
      .then(toy => res.status(201).send(toy))
      .catch(err => next(err));
  });

  router.get('/api/toy/:_id', (req, res, next) => {
    debug('/api/toy/:_id GET');
    if (!req.params._id){
      err.status;
    }
    return storage.fetchOne(req.params._id)
      .then(toy => res.json(toy))
      .catch(next);

  });

  router.get('/api/toy', (req, res, next) => {
    debug('/api/toy GET');
    return storage.fetchAll('toy')
      .then(data => res.json(data))
      .catch(next);

  });

  router.put('/api/toy/:_id', (req, res, next) => {
    debug('/api/toy PUT');

    return storage.update(req.body, req.params._id)
      .then(() => res.status(204))
      .catch(next);
  });

  router.delete('/api/toy/:_id', (req, res, next) => {
    debug('/api/toy DELETE');

    return storage.destroy('toy', req.params._id)
      .then(() => res.status(204).json('yay'))
      .catch(err => createError(err.status, err.message), next);


  });
};
