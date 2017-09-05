//None of my tests are running properly and I don't really understand why...?//
'use strict';

const superagent = require('superagent');
const server = require('../../server');
// const Promise = require('bluebird');
// const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
require('jest');

describe('Testing toy routes', function() {
  afterAll(done => server.close(done));

  describe('all request to /api/toy', () => {
    describe('POST request tests', () => {
      describe('Valid requests', () => {
        test('should create a return a new toy, given a valid request', done => {
          superagent.post(':3000/api/toy')
            .type('application/json')
            .send({
              name: 'my little pony',
              desc: 'pink',
            })
            .then(res => {
              this.mockToy = res.body;
              this.resPost = res;
              expect(this.mockToy).toBeInstanceOf(Object);
              expect(this.mockToy).toHaveProperty('name');
              expect(this.mockToy).toHaveProperty('desc');
              expect(this.mockToy).toHaveProperty('_id');
              done();
            });
        });
        test('should have a name, given a valid request', () => {
          expect(this.mockToy.name).toBe('my little pony');
        });
        test('should have a desc, given a valid request', () => {
          expect(this.mockToy.desc).toBe('pink');
        });
        test('should have an _id, given a valid request', () => {
          expect(this.mockToy._id).toBeTruthy();
        });
        test('should return a 201', () => {
          expect(this.resPost.status).toBe(201);
        });
      });
      describe('Invalid Requests', () => {
        test.only('should return 404', done => {
          superagent.post(':3000/api/toy')
            .type('application/json')
            .send({})
            .catch(err => {
              expect(err.status).toBe(400);
              done();
            });

        });
      });
// });
describe('GET requests', () => {
  beforeAll(done => {
    superagent.post('.3000/api/toy').type('application/json')
      .send({
        name: 'bob',
        desc: 'fuzzy bear',
      })
      .then(res => {
        this.mockToy = res.body;
        this.resGet = res;
        done();
      });
    test('should get the record for toy dir', done => {
      expect(this.mockToy.name).toBe('bob');
      done();
    });
  });
});
});
});
});
