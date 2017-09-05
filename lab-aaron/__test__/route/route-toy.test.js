'use strict';

const server = require('../server.js');
const superagent = require('supergent');

let testToy;

describe('#route-toy-test', () => {
  afterAll((done) => {
    server.close(() => done());
  });

  describe('#post method', () => {
    describe('post method endpoint', ()=> {
      test('should return 400 ')
    })
  });
});
