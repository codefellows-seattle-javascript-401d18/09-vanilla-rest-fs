'use strict';
require('jest');
const faker = require('faker');
const server = require('../../server');
const superagent = require('superagent');

describe('Testing Toy Routes', function() {
  beforeAll(done => {
    // using faker to make some fake data?
    // let fakeToy = {
    //   let toyName = faker.name.findName();
    //   let toyDesc = faker.lorem.words();
    //   let toyUid = faker.random.number();
    // };
    //
    done();
  });
  afterAll(done => server.close(done));

  describe('requests made to /api/toy', () => {
    describe('using GET method', () => {
      test('should return a toy object given a properly formatted request', done => {

      });
    });
  });
});
