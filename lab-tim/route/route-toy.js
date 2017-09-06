'use strict';

const Toy = require('../model/toy');
const storage = require('../lib/storage');
const response = require('../lib/response');
const debug = require('debug')('http:route-toy');


module.exports = function(router) {
  router.post('/api/toy', (req, res) => {
    debug('/api/toy POST');
    try {
      let newToy = new Toy(req.body.name, req.body.desc);
      // if successful, store this thing using fs module
      storage.create('toy', newToy)
        .then(toy => response.sendJson(res, 201, toy));
    } catch(err) {
      console.error(err);
      response.sendText(res, 400, `bad request: ${err.message}`);
    }
  });

  router.put('/api/toy', (req, res) => {
    debug('/api/toy PUT');
    //console.log(req.body._id);
    if(req.body._id) {
      let updateToy = req.body;
      // console.log(updateToy);
      storage.update('toy', updateToy)
        .then(toy => response.sendJson(res, 204, toy))
        .catch(err => {
          console.error(err);
          response.sendText(res, 400, `bad request: ${err.message}`);
        });
    }
    // else {
    //   try {
    //     let newToy = new Toy(req.body.name, req.body.desc);
    //     // if successful, store this thing in memory using the storage module
    //     storage.create('toy', newToy)
    //       .then(toy => {
    //         res.writeHead(201, {'Content-Type': 'application/json'});
    //         res.write(JSON.stringify(toy));
    //         res.end();
    //       });
    //   } catch(err) {
    //     console.error(err);
    //     response.sendText(res, 400, `bad request: ${err.message}`);
    //   }
    // }
  });

  router.get('/api/toy', (req, res) => {
    debug('/api/toy GET');
    if(req.url.query._id) {
      storage.fetchOne('toy', req.url.query._id)
        .then(toy => response.sendJson(res, 200, toy))
        .catch(err => {
          console.error(err);
          response.sendText(res, 404, `bad request: not found`);
          res.end();
        });
      return;
    }

    // if(!req.url.query._id) {
    //   storage.fetchAll('toy')
    //     .then(toyArray => response.sendJson(res, 200, toyArray))
    //     .catch(err => {
    //       console.error(err);
    //       response.sendText(res, 404, `bad request: ${err.message}`);
    //     });
    //   return;
    // }

    response.sendText(res, 400, 'bad request: item id required to get record');
  });

  router.delete('/api/toy', (req, res) => {
    debug('/api/toy DELETE');
    if(req.url.query._id) {
      storage.remove('toy', req.url.query._id)
        .then(toy => response.sendJson(res, 204, toy))
        .catch(err => {
          console.error(err);
          response.sendText(res, 404, `bad request: ${err.message}`);
        });
      return;
    }

    response.sendText(res, 404, 'bad request: item id required to get record');
  });
};
