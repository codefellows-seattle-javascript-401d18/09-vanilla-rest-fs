'use strict';

const debug = require('debug')('http:route-toy');
const Toy = require('../model/toy');
const storage = require('../lib/storage');


module.exports = function(router) {
  //Post
  router.post('/api/toy', (req, res) => {
    debug('/api/toy POST');
    try {
      let newToy = new Toy(req.body.name, req.body.desc);
      // if successful, store this thing in memory using the storage module
      storage.create('toy', newToy)
        .then(toy => {
          res.writeHead(201, {'Content-Type': 'application/json'});
          res.write(JSON.stringify(toy));
          res.end();
        });
    } catch(e) {
      // console.error(e);
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write('bad request: could not create a new toy');
      res.end();
    }
  });
  //GET
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

  //DELETE
  router.delete('/api/toy', (req, res) => {
    debug('/api/toy DELETE');
    if(!req.url.query._id){
      res.writeHead(404);
      res.write('error - Improper format for DELETE');
      res.end();
      return ;
    }
    storage.delete('toy', req.url.query._id)
      .then(toy => {
        res.writeHead(204, {'Content-Type': 'text/plain'});
        res.write('Deleted ' + toy + req.url.query._id + 'from storage');
        res.end();
      })
      .catch(err => {
        console.error(err);
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.write('bad request; could not find record');
        res.end();
      });
    return;
  });
  //PUT
  router.put('/api/toy', (req, res) => {
    debug('/api/toy PUT');
    if(!req.url.query._id){
      res.writeHead(400);
      res.write('error - no id exists to update that record');
      res.end();
      return;
    }
    storage.put('toy', req.url.query._id, req);
    res.writeHead(204, {
      'Content-Type': 'application/json',
    });
    res.write('Updated this toy with ' + req.body.name + ' and ' + req.body.desc);
    res.end();
  });
};
