
'use strict';

const debug = require('debug')('http:storage');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});

const storage = module.exports = {};

// fs.readFileProm(`${__dirname}/../data/${schema}/${item_id}.json)
// .then(...)
// .catch(...)

// const memory = {
//   'toy': {
//     '123-456-789': {_id: '123-456-789', name: 'barney', desc: 'purple dino'}
//   }
// }

storage.create = function(schema, item) {
  debug('#storage.create');
  // debugger
  return new Promise(function(resolve, reject) {
    if(!schema) return reject(new Error('cannot create; schema required'));
    if(!item) return reject(new Error('cannot create; item required'));

    let json = JSON.stringify(item);

    return fs.writeFileProm(`${__dirname}/../data/${schema}/${item._id}.json`, json)
      .then(() => resolve(item))
      .catch(console.error);
  });
};

storage.update = function(schema, item) {
  debug('#storage.update');
  return new Promise(function(resolve, reject) {
    if(!schema) return reject(new Error('cannot update; schema required'));
    if(!item) return reject(new Error('cannot update; item required'));

    let json = JSON.stringify(item);

    return fs.writeFileProm(`${__dirname}/../data/${schema}/${item._id}.json`, json)
      .then(() => resolve(item))
      .catch(console.error);
  });
};
// if(!memory[schema]) memory[schema] = {};
// if(!memory[schema][item._id]) memory[schema] = {};
// memory[schema][item._id] = item;

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

// storage.fetchAll = function(schema) {
//   debug('#storage.fetchAll');
//   return new Promise((resolve, reject) => {
//     if(!schema) return reject(new Error('cannot get items; schema required'));
//     let toyArray = [];
//     memory[schema].forEach(function(toyId) {
//       toyArray.push(toyId);
//     });
//     return resolve(toyArray);
//   });
// };

storage.remove = function(schema, itemId) {
  debug('#storage.remove');
  return new Promise((resolve, reject) => {
    if(!schema) return reject(new Error('cannot get item; schema required'));
    if(!itemId) return reject(new Error('cannon get item; itemId required'));

    return fs.unlinkProm(`${__dirname}/../data/${schema}/${itemId}.json`)
      .then(resolve('Item deleted.'))
      .catch(err => {
        console.error(err);
        //return err;
      });
  });
};
