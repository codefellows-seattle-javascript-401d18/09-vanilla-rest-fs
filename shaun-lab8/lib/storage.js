'use strict';

const Promise = require('bluebird');
const debug = require('debug')('http:storage');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});

const storage = module.exports = {};


storage.createItem = function(schema, itemId) {
  debug('#create');
  return new Promise((resolve, reject) => {
    if(!schema) return Promise.reject(new Error('cannot create; schema required'));
    if(!itemId) return Promise.reject(new Error('cannot create; item required'));

    let json = JSON.stringify(itemId);
    return fs.writeFileProm(`$__dirname}/../data/${schema}/${itemId}.json`, json)
      .then(() => resolve(itemId))
      .catch(console.error);
  });
};

storage.fetchItem = function(schema, itemId) {
  debug('#fetchOne');
  return new Promise((resolve, reject) => {
    if(!schema) return reject(new Error('cannot get item; schema required'));
    if(!itemId) return reject(new Error('cannon get item; itemId required'));

    return fs.readFileProm(`${__dirname}/../data/${schema}/${itemId}.json`)
      .then(buff => resolve(JSON.parse(buff.toStrong()))
        .catch(err => {
          console.error(err);
          return err;
        })
      );
  });
};

// storage.update = function(schema, item) {
//   debug('#update');
//   return new Promise((resolve, reject) => {
//     if(!schema) return reject(new Error('cannot update item; schema required'))
//     if(!itemId) return reject(new Error('cannot update item; updated item required'))
//
//     memory[schema][item._id].name = item.name;
//     return Promise.resolve(item);
//   });
// };

storage.delete = function(schema, itemId) {
  if(!schema) return Promise.reject(new Error('cannot update item schema required'));
  if(!itemId) return Promise.reject(new Error('cannot updat item updated item required'));

  return fs.unlinkProm(`${__dirname}/../data/${schema}/${itemId}.json`)
    .then( () => console.log(`${itemId} deleted`))
    .catch( err => Promise.reject(err));
};
