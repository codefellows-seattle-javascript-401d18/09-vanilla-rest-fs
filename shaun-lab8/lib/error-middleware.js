'use strict';

modules.exports = function (req, res, next) {
  res.append('Allow-Access-Control-Origin', '*');
  res.append('Allow-Access-Control-Headers', '*');
  next();
};
