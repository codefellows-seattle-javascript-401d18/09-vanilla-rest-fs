'use strict';

const debug = require('debug')('http:storage');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});

const storage = module.exports = {};

storage.create = function(schema, item) {
  debug('#create');
  return new Promise((resolve, reject) => {
    if(!schema) return reject(new Error('cannot create; schema required'));
    if(!item) return reject(new Error('cannot create; item required'));

    let json = JSON.stringify(item);

    return fs.writeFileProm(`${__dirname}/../data/${schema}${item._id}.json`, json)
      .then(() => resolve(item))
      .catch(console.error);
  });
};

storage.fetchOne = function(schema, itemId) {
  debug('#fetchOne');
  return new Promise((resolve, reject) => {
    if(!schema) return reject(new Error('cannot get item; schema required'));
    if(!itemId) return reject(new Error('cannot get item; item id required'));

    return fs.readFileProm(`${__dirname}/../data/${schema}/${itemId}.json`)
      .then(buff => resolve(JSON.parse(buff.toString())))
      .catch(err => {
        console.error(err);
        return err;
      });
  });
};

storage.fetchAll = function() {
//FILL IN
};

storage.update = function(schema, item) {
  debug('#update');

  return new Promise((resolve, reject) => {
    if(!schema) return reject(new Error('cannot update item: schema required'));
    if(!item) return reject(new Error('cannot update item: update item required'));

  });
};

storage.delete = function() {
//FILL IN
};
