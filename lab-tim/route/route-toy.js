'use strict';

const debug = require('debug')('http:route-toy');
const Toy = require('../model/toy');
const storage = require('../lib/storage');

module.exports = function(router) {
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
      console.error(e);
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write('bad request: could not create a new toy');
      res.end();
    }
  });

  router.put('/api/toy', (req, res) => {
    debug('/api/toy PUT');
    //console.log(req.body._id);
    if(req.body._id) {
      //let updateToy = req.body;
      // console.log(updateToy);
      storage.update('toy', req.body)
        .then(() => {
          res.writeHead(204, {'Content-Type': 'application/json'});
          //res.write(JSON.stringify(toy));
          res.end();
        })
        .catch(err => {
          //console.error(err);
          res.writeHead(400, {'Content-Type': 'text/plain'});
          res.write(`bad request: ${err.message}`);
          res.end();
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
    //   } catch(e) {
    //     console.error(e);
    //     res.writeHead(400, {'Content-Type': 'text/plain'});
    //     res.write('bad request: could not create a new toy');
    //     res.end();
    //   }
    // }
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
          res.writeHead(404, {'Content-Type': 'text/plain'});
          res.write('bad request; could not find record');
          res.end();
        });
      return;
    }

    if(!req.url.query._id) {
      storage.fetchAll('toy')
        .then(toyArray => {
          res.writeHead(200, {'Content-Type': 'application/json'});
          res.write(toyArray);
          res.end();
        })
        .catch(err => {
          console.error(err);
          res.writeHead(404, {'Content-Type': 'text/plain'});
          res.write('bad request; could not find record');
          res.end();
        });
      return;
    }

    res.writeHead(400, {'Content-Type': 'text/plain'});
    res.write('bad request; item id required to get record');
    res.end();
  });

  router.delete('/api/toy', (req, res) => {
    debug('/api/toy DELETE');
    if(req.url.query._id) {
      storage.remove('toy', req.url.query._id)
        .then(toy => {
          res.writeHead(204, {'Content-Type': 'text/plain'});
          console.log(toy);
          res.end();
        })
        .catch(err => {
          console.error(err);
          res.writeHead(404, {'Content-Type': 'text/plain'});
          res.write('bad request; could not find record');
          res.end();
        });
      return;
    }

    res.writeHead(400, {'Content-Type': 'text/plain'});
    res.write('bad request; item id required to get record');
    res.end();
  });
};
