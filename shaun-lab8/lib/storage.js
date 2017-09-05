
'use strict';

const debug = require('debug')('http:storage');
const createError = require('http-errors');
const Toy = require('../model/toy');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});

const storage = module.exports = {};


storage.create = function(schema, item) {
  debug('#create');
  // debugger
  return new Promise(function(resolve, reject) {
    if(!schema) return reject(new Error('cannot create; schema required'));
    if(!item) return reject(new Error('cannot create; item required'));

    let toy = new Toy(item.name, item.desc);

    return fs.writeFileProm(`${__dirname}/../data/toy/${toy._id}.json`, JSON.stringify(toy))
      .then(() => resolve(item))
      .catch(reject);
  });
};


storage.update = function(schema, item) {
  debug('#storage.update');
  return new Promise(function(resolve, reject) {
    if(!schema) return reject(new Error('cannot update; schema required'));
    if(!item) return reject(new Error('cannot update; item required'));


    return fs.writeFileProm(`${__dirname}/../data/toy/${item._id}.json`, JSON.stringify(item))
      .then(resolve)
      .catch(reject);
  });
};



storage.fetchOne = function(schema, itemId) {
  debug('#storage.fetchOne');
  return new Promise((resolve, reject) => {
    if(!schema) return reject(new Error('cannot get item; schema required'));
    if(!itemId) return reject(new Error('cannot get item; itemId required'));

    return fs.readFileProm(`${__dirname}/../data/${schema}/${itemId}.json`)
      .then(buff => resolve(JSON.parse(buff.toString())))
      .catch(err => {
        console.error(err);
        return reject(err);
      });
  });
};

storage.fetchAll = function(schema) {
  debug('#fetchAll');
  return new Promise((resolve, reject) => {
    if(!schema) return reject(new Error('cannot get item; schema required'));

    return fs.readFileProm(`${__dirname}/../data/${schema}`)
      .then(ids => {
        let data = Array.prototype.map.call(ids, (id => id.split('.', 1).toString()));
        return resolve(data);
      })      // console.error(err);
      .catch(reject);
  });
};

storage.fetchOne = function(itemId) {
  debug('#fetchOne');
  return new Promise((resolve, reject) => {
    if(!itemIdea) return reject(new Error('cannot get item; itemID required'));

    return fs.readFileProm(`${__dirname}/../data/toy/${itemId}.json`)
      .then(buff => {
        try {
          let toy = JSON.parse(buff.toString());
          return resolve(toy);
        } catch(e) {
          return reject(e);
        }
      })
      .catch(reject);
  });
};

storage.delete = function(schema, itemId) {
  debug('#delete');
  return new Promise((resolve, reject) => {
    if(!schema) return reject(new Error('cannot create; schema required'));
    if(!itemId) return reject(new Error('cannot create; item required'));

    return fs.unlinkProm(`${__dirname}/../data/${schema}/${itemId}.json`)
      .then(resolve)
      .catch(reject); 
  });
};
