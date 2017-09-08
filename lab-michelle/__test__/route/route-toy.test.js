//None of my tests are running properly and I don't really understand why...?//
'use strict';

const superagent = require('superagent');
const server = require('../../server');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
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
            .send()
            .catch(err => {
              expect(err.status).toBe(400);
              done();
            });

        });
      });
    });
    //we needed an explicit return, otherwise it's an if : then statement
    describe('GET request tests', () => {
      describe('Valid requests', () => {
        test('should get a toy given a valid request', done => {
          superagent.get(':3000/api/toy')
            .query({_id: this.mockToy._id})
            .then(res => {
              this.resGet = res;

              expect(res.body).toBeInstanceOf(Object);
              expect(res.body).toHaveProperty('name');
              expect(res.body).toHaveProperty('desc');
              expect(res.status).toBe(200);
              done();
            });
        });
      });

      describe('Invalid requests', () => {
        test('should not get a valid thing', () => {
          return superagent.get(':3000/api/toy')
            .query({_id: '1234'})
            .catch(res => {
              expect(res.status).toBe(404);
            });
        });
      });
    });
    describe('PUT requests', ()=> {
      describe('Valid requests', () => {
        //if we send an id
        test('should create a return a new toy, given a valid request', done => {
          superagent.put(':3000/api/toy')
            .query({_id: this.mockToy._id})
            .type('application/json')
            .send({
              name: 'bob',
              desc: 'stuffed turtle',
              _id: this.mockToy._id,
            })
            .then(res => {
              this.mockToy = res.body;
              this.resPut = res;
              expect(this.resPut.status).toBe(204);
              done();
            });
        });
        //don't send an id
        test('should return 201 if  we send something without an id', done => {
          superagent.put(':3000/api/toy')
            .type('application/json')
            .send({
              name: 'bob',
              desc: 'stuffed turtle',
            })
            .then(res => {
              this.mockToy = res.body;
              this.resPut = res;
              expect(this.resPut.status).toBe(201);
              expect(this.mockToy.name).toBe('bob');
              expect(this.mockToy.desc).toBe('stuffed turtle');
              expect(this.mockToy._id).toBeTruthy();
              done();

              //no body and no id
            });
        });
      });
      describe('Invalid', () => {
        test('should return error if we sent nothing with no id', done => {
          superagent.put(':3000/api/toy')
            .type('application/json')
            .send(null)
            .catch(res => {
              this.resPut = res;
              expect(this.resPut.status).toBe(400);
              done();
            });
        });
      });
    });
    //send an id
    //send incorrect id
    //send no id
    describe('DELETE requests', ()=> {
      describe('Valid requests', () => {
          test('confirm that it deleted a thing', done => {
            console.log(this.mockToy)
            superagent.delete(':3000/api/toy')
            .query({_id: this.mockToy._id})
            .then(res => {
              this.resDelete = res;
              expect(res.status).toBe(204);
              done();
            });
        });
      });
      describe('Invalid requests', ()=> {
        test('confirm that an incorrect id will result in an error', done => {
          superagent.delete(':3000/api/toy')
          .query({_id: 'tabgobargblawrjg'})
          .catch(res => {
            expect(res.status).toBe(404);
            done();
          });
        });
        test('confirm that if we send no id, it will error', done => {
          superagent.delete(':3000/api/toy')
          .catch(res => {
            expect(res.status).toBe(400);
            done();
        });
      });
    });
  });
});
});
