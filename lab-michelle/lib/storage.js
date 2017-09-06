'use strict';

const debug = require('debug')('http:storage');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const Toy = require('../model/toy');

const storage = module.exports = {};

storage.create = function(schema, item) {
  debug('#create');

  return new Promise((resolve, reject) => {
    if(!schema) return reject(new Error('cannot create; schema required'));
    if(!item.name || !item.desc) return reject(new Error('cannot create; item required'));

    let newToy = new Toy(item.name, item.desc);

    let json = JSON.stringify(newToy);

    return fs.writeFileProm(`${__dirname}/../data/${schema}/${newToy._id}.json`, json)
      .then(() => resolve(newToy))
      .catch(reject);
  });
};

storage.fetchOne = function(schema, itemId) {
  debug('#fetchOne');

  return new Promise((resolve, reject) => {
    if(!schema) return reject(new Error('cannot get item; schema required'));
    if(!itemId) return reject(new Error('cannot get item; item id required'));

    return fs.readFileProm(`${__dirname}/../data/${schema}/${itemId}.json`)
      .then(buff => {
        try {
          resolve(JSON.parse(buff.toString()));
          return resolve(toy);
        } catch(e) {
          return reject(e);
        }
      })
      .catch(reject);
  });
};

storage.fetchAll = function(schema) {
  debug('#fetchAll');

  return new Promise((resolve, reject) => {
    if (!schema) return reject(new Error('cannot get all the items; item schema required'));

    return fs.readdirProm(err, `${__dirname}/../data/${schema}`)
      .then(ids => {
        let data =  Array.prototype.map.call(ids, (id => id.split('.', 1).toString()));
        return resolve(data);
      })
      .catch(reject);
  });
};

storage.update = function(schema, item) {
  debug('#update');

  return new Promise((resolve, reject) => {
    if(!schema) return reject(new Error('cannot update: schema required'));
    if(!item) return reject (new Error('cannot update: item required'));

    return fs.writeFileProm(`${__dirname}/../data/${schema}/${item._id}.json`, JSON.stringify())
      .then(resolve)
      .catch(reject);
  });
};

storage.delete = function(schema, itemId) {
  debug('#storage delete');

  return new Promise((resolve, reject) => {
    if (!schema) return reject(new Error('cannot delete item: schema required'));
    if (!itemId) return reject(new Error('cannot delete item; itemId required'));

    return fs.unlinkProm(`${__dirname}/../data/${schema}/${itemId}.json`)
      .then(resolve)
      .catch(reject);
  });
};
