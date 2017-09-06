'use strict';

const debug = require('debug')('http:model-toy');
const uuid = require('uuid/v4');

//object toy constructor
module.exports = function(name, desc, price, material){
  debug(`model-toy: ${name} created`);
  this.name = name;
  this.desc = desc;
  this.price = price;
  this.material = material;
  this._id = uuid();
};
