'use strict';

const debug = require('debug')('http:route-toy');
const Toy = require('../model/toy');
const storage = require('../lib/storage');
const response = require('../lib/response');

module.exports = function(router) {
  router.post('/api/toy', (req, res) => {
    debug('/api/toy POST');
    try {
      let newToy = new Toy(req.body.name, req.body.desc);
      console.log(newToy);
      storage.create('toy', newToy)
        .then(toy => response.sendJson(res, 201, toy));
    } catch(err) {
      console.error(err);
      response.sendText(res, 400, `bad request ${err.message}`);
    }
  });

  router.get('/api/toy', (req, res) => {
    debug('/api/toy GET');
    if(req.url.query._id) {
      storage.fetchOne('toy', req.url.query._id)
        .then(toy => {
          res.writeHead(200, {'Content-Type': 'application/json'});
          res.write(JSON.stringify(toy));
          res.end();
        })
        .catch(err => {
          console.error(err);
          res.writeHead(400, {'Content-Type': 'text/plain'});
          res.write('bad request; could not find record');
          res.end();
        });
      return;
    }

    res.writeHead(400, {'Content-Type': 'text/plain'});
    res.write('bad request; item id required to get record');
    res.end();
  });

  router.put('/api/toy', (req, res) => {
    debug('/api/toy PUT');
    if (req.url.query._id) {
      if(!req.body._id && !req.body.name && !req.body.desc) {
        res.writeHead(400, {'Content-Type': 'application/json'});
        res.write(`bad request; body improperly formatted`);
        res.end();
        return;
      }
      storage.update('toy', req.body)
        .then(() => {
          res.writeHead(204, {'Content-Type': 'text/plain'});
          res.end();
          return;
        })
        .catch(err => {
          res.writeHead(400, {'Content-Type': 'application/json'});
          res.write(`bad request; ${err.message}`);
          res.end();
          return;
        });
      return;
    }

    res.writeHead(400, {'Content-Type': 'text/plain'});
    res.write('bad request; item id required to get record');
    res.end();
  });


  // This is where the delete method goes...
  router.delete('/api/toy', (req, res) => {
    debug('/api/toy DELETE');
    try {
      Toy.findByIdAndRemove(req.url.query._id, () => {
        res.writeHead(204, {'Content-Type': 'text/plain'});
        res.write('successful request: toy deleted');
        res.end();
      });
    } catch(err) {
      console.error(err);
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write('bad request: Unable to delete toy');
      res.end();
    }
  });

};
