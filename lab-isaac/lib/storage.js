'use strict';

const debug = require('debug')('http:storage');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});

// fs.readFileProm(`${__dirname}/../data/${schema}/${item_id}.json)
// .then(...)
// .catch(...)

const storage = module.exports = {};

storage.create = function(schema, item) {
  debug('#create new json file');

  return new Promise((resolve) => {
    if(!schema) return Promise.reject(new Error('cannot create; schema required'));
    if(!item) return Promise.reject(new Error('cannot create; item required'));

    let json = JSON.stringify(item);

    return fs.writeFileProm(`${__dirname}/../data/${schema}/${item._id}.json`, json)
      .then(() => resolve(item))
      .catch(console.error);
  });

};

storage.fetchOne = function(schema, itemId) {
  debug('#fetchOne');
  return new Promise((resolve, reject) => {


    let directory = `${__dirname}/../data/${schema}/`;
    let dirBuf = Buffer.from(directory);

    fs.readdir(dirBuf, (err, files) => {
      if(err) console.log(err);
      console.log(itemId);
      files.forEach(id => {
        if(id.split('.')[0] !== itemId) return;
        searchFile = false;
      });
    });
    let searchFile = true;
    // let searchFile = fs.readFileProm(`${__dirname}/../data/${schema}/${itemId}.json`);

    if(!schema) return reject(new Error('cannot get item; schema required'));
    if(!itemId) return reject(new Error('cannot get item; itemId required'));
    if(!searchFile) return reject(new Error('cannot get item; item does not exist'));

    //if(!memory[schema][itemId]) return reject(new Error('cannot get item; item does not exist'));

    return fs.readFileProm(`${__dirname}/../data/${schema}/${itemId}.json`)
      .then(buff => resolve(JSON.parse(buff.toString())))
      .catch(err => {
        console.error(err);
        return err;
      });
  });
};

storage.fetchAll = function(schema, item) {
  debug('#schema fetchAll', schema);
  debug('#item fetchAll', item);
};

storage.update = function(schema, item) {
  debug('#update');

  return new Promise((resolve, reject) => {
    if(!schema) return reject(new Error('cannot update item; schema required'));
    if(!item) return reject(new Error('cannot update item; item required'));
  });
};

storage.delete = function(schema, item) {
  debug('#schema delete', schema);
  debug('#item delete', item);
};
