'use strict';

const debug = require('debug')('http:storage');

const storage = module.exports = {};
const memory = {};
// const memory = {
//   'toy': {
//     '123-456-789': {_id: '123-456-789', name: 'barney', desc: 'purple dino'}
//   }
// }

storage.create = function(schema, item) {
  debug('#create');
  if(!schema) return Promise.reject(new Error('cannot create; schema required'));
  if(!item) return Promise.reject(new Error('cannot create; item required'));
  if(!memory[schema]) memory[schema] = {};

  memory[schema][item._id] = item;
  return Promise.resolve(item);
};

storage.update = function(schema, item) {
  debug('#update');
  if(!schema) return Promise.reject(new Error('cannot update; schema required'));
  if(!item) return Promise.reject(new Error('cannot update; item required'));
  if(!memory[schema]) memory[schema] = {};
  if(!memory[schema][item._id]) memory[schema] = {};

  memory[schema][item._id] = item;
  return Promise.resolve(item);
};

storage.fetchOne = function(schema, itemId) {
  debug('#fetchOne');
  return new Promise((resolve, reject) => {
    if(!schema) return reject(new Error('cannot get item; schema required'));
    if(!itemId) return reject(new Error('cannon get item; itemId required'));
    if(!memory[schema]) return reject(new Error('cannot get item; schema does not exist'));
    if(!memory[schema][itemId]) return reject(new Error('cannot get item; item does not exist'));

    return resolve(memory[schema][itemId]);
  });
};

// const memory = {
//   'toy': {
//     '123-456-789': {_id: '123-456-789', name: 'barney', desc: 'purple dino'}
//   }
// }

storage.fetchAll = function(schema) {
  debug('#fetchAll');
  return new Promise((resolve, reject) => {
    if(!schema) return reject(new Error('cannot get items; schema required'));
    //if(!itemId) return reject(new Error('cannon get item; itemId required'));
    if(!memory[schema]) return reject(new Error('cannot get items; schema does not exist'));
    //if(!memory[schema][itemId]) return reject(new Error('cannot get item; item does not exist'));
    let toyArray = [];
    memory[schema].forEach(function(toyId) {
      toyArray.push(toyId);
    });
    return resolve(toyArray);
  });
};

storage.remove = function(schema, itemId) {
  debug('#remove');
  return new Promise((resolve, reject) => {
    if(!schema) return reject(new Error('cannot get item; schema required'));
    if(!itemId) return reject(new Error('cannon get item; itemId required'));
    if(!memory[schema]) return reject(new Error('cannot get item; schema does not exist'));
    if(!memory[schema][itemId]) return reject(new Error('cannot get item; item does not exist'));

    delete memory[schema][itemId];
    return resolve('Item deleted');
  });
};
