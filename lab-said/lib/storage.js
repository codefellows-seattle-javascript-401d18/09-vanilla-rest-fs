'use strict';

const debug = require('debug')('http:storage');

const storage = module.exports = {};
const memory = {};

storage.create = function(schema, item) {
  debug('#create');
  if(!schema) return Promise.reject(new Error('cannot create; schema required'));
  if(!item) return Promise.reject(new Error('cannot create; item required'));
  if(!memory[schema]) memory[schema] = {};

  memory[schema][item._id] = item;
  return Promise.resolve(item);
};
storage.fetchOne = function(schema, itemId) {
  return new Promise((resolve, reject) => {
    if(!schema) return reject(new Error('cannot get item; schema required'));
    if(!itemId) return reject(new Error('cannon get item; itemId required'));
    if(!memory[schema]) return reject(new Error('cannot get item; schema does not exist'));
    if(!memory[schema][itemId]) return reject(new Error('cannot get item; item does not exist'));

    return resolve(memory[schema][itemId]);
  });
};

storage.fetchAll = function(schema, item) {

};

storage.update = function(schema, item) {
  debug('#update');
  return new Promise((resolve, reject) => {
    if(!schema) return reject(new Error('cannot update; schema required'));
    if(!item) return reject(new Error('cannot create; item required'));
    if(!memory[schema]) memory[schema] = {};
    memory[schema][item._id] = item;
    return resolve(item);
  });
};

storage.delete = function(schema, itemId) {
  if (memory[schema][itemId]) {
    delete memory[schema][itemId];
    return Promise.resolve();
  }
  return Promise.reject(new Error('item not found'));
};
