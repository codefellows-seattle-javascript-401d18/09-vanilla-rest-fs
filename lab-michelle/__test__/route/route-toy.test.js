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
        test('should return 404', done => {
          superagent.post(':3000/api/toy')
            .type('application/json')
            .send({})
            .catch(err => {
              expect(err.status).toBe(400);
              done();
            });

        });
      });
    });
    //Thanks to Said and TAs we got this one to work!
    describe('GET request tests', () => {
      describe('Valid requests', () => {
        test('should get a toy given a valid request', done => {
          superagent.get(':3000/api/toy')
            .query({_id: this.mockToy._id})
            .then(res => {
              this.resGet = res.body;
              this.resGet.status = res.status;
              expect(this.resGet).toBeInstanceOf(Object);
              expect(this.resGet).toHaveProperty('name');
              expect(this.resGet).toHaveProperty('desc');
              expect(this.resGet.status).toBe(201);
              done();
            });
        });
        describe('Invalid requests', () => {
          test('should not get a valid thing', done => {
            superagent.get(':3000/api/toy')
              .query({_id: this.mockToy._id})
              .then(res => {
                this.resGet = res.body;
                this.resGet.status = res.status;
                expect(this.resGet).toBeInstanceOf(woot);
                expect(this.resGet).toHaveProperty('banana');
                expect(this.resGet).toHaveProperty('bob');
                expect(this.resGet.status).toBe(404);
                done();
              });
          });
        });
      });
    });
    describe('PUT requests', ()=> {
      describe('Valid requests', () => {
        test('should create a return a new toy, given a valid request', done => {
          superagent.put(':3000/api/toy')
            .type('application/json')
            .send({
              name: 'jones',
              desc: 'stuffed turtle',
            })
            .then(res => {
              this.mockToy = res.body;
              this.resPut = res;

              //if jones the turtle exists, then update (so mock data = the actual data that goes in)
              //if jones the turtle doesn't exist, create him
              if (!this.mockToy) {
                expect(this.mockToy).toBeInstanceOf(Object);
                expect(this.mockToy).toHaveProperty('name');
                expect(this.mockToy).toHaveProperty('desc');
                expect(this.mockToy).toHaveProperty('_id');
                done();
              } else {
                expect(this.mockToy.name).toBe('jones');
              }
            });
        });
      });
    });
    describe('DELETE requests', ()=> {
      describe('Valid requests', () => {
        beforeAll(done => {
          superagent.delete(':3000/api/toy')
            .query({_id: this.mockToy._id})
            .then(res => {
              this.resDelete = res;
              done();
            });
        });
        test('should remove the record from the toy dir', done => {
          fs.readdirProm(`${__dirname}/../../data/toy`)
            .then(files => {
              let expectedFalse = files.includes(`${this.mockToy._id}.json`);
              expect(expectedFalse).toBeFalsy();
              console.log(expectedFalse);
              done();
            });
        });
      });
    });
  });
});
