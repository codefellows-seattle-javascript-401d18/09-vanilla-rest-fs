'use strict';

const debug = require('debug')('http:model-toy');
const uuid = require('uuid/v4');

module.exports = function(name, desc, color, manif) {
  debug(`model-toy: ${name} created`);
  this.name = name;
  this.desc = desc;
  this.color = color;
  this.manif = manif;
  this._id = uuid();
};
