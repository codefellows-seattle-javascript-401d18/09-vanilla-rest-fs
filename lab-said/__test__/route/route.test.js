'use strict';

const superagent = require('superagent');
const server = require('../../server');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
require('jest');

// qouted from the licture! still so confused about test constructing!!
describe('Testing toy routes', function() {
  afterAll(done => server.close(done));

  describe('all requests to /api/toy', () => {
    describe('POST requests', () => {
      describe('Valid Requests', ()  => {
        test('should create and return a new toy, given a valid request', (done) => {
          superagent.post(':3000/api/toy')
            .type('application/json')
            .send({
              name: 'barney',
              desc: 'purple dino',
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
        test('should have a name, given a valid request', (done) => {
          expect(this.mockToy.name).toBe('barney');
          done();
        });
        test('should have a desc, given a valid request', (done) => {
          expect(this.mockToy.desc).toBe('purple dino');
          done();
        });
        test('should have an _id, given a valid request', (done) => {
          expect(this.mockToy).toHaveProperty('_id');
          expect(this.mockToy._id).toMatch(/([a-f0-9]{8}(-[a-f\d]{4}){3}-[a-f\d]{12}?)/i);
          done();
        });
        test('should return a 201 CREATED, given a valid request', (done) => {
          expect(this.resPost.status).toBe(201);
          done();
        });
      });

      describe('invalid request', () => {
        test('should return a 400, given an invalid request', (done) => {
          superagent.post(':3000/api/toy')
            .type('application/json')
            .send(null)
            .catch(err => {
              expect(err.status).toBe(400);
              done();
            });
        });
      });
    });

    describe('GET requests', () => {
      describe('Valid Requests', ()  => {
        test('should get the record from the toy dir', done => {
          superagent.get(':3000/api/toy')
            .query({_id: this.mockToy._id})
            .then(res => {
              this.resGet = res.body;
              this.resGet.status = res.status;
              expect(this.resGet).toBeInstanceOf(Object);
              expect(this.resGet).toHaveProperty('name');
              expect(this.resGet).toHaveProperty('desc');
              expect(this.resGet).toHaveProperty('_id');
              done();
            });
        });
        test('should have a name, given a valid request', (done) => {
          expect(this.resGet.name).toBe('barney');
          done();
        });
        test('should have a desc, given a valid request', (done) => {
          expect(this.resGet.desc).toBe('purple dino');
          done();
        });
        test('should have an _id, given a valid request', (done) => {
          expect(this.resGet).toHaveProperty('_id');
          expect(this.resGet._id).toMatch(/([a-f0-9]{8}(-[a-f\d]{4}){3}-[a-f\d]{12}?)/i);
          done();
        });
        test('should return a 201 CREATED, given a valid request', (done) => {
          expect(this.resGet.status).toBe(201);
          done();
        });
      });

      describe('invalid requests', () => {
        test('should return an error, given an invalid id', (done) => {
          superagent.get(':3000/api/toy')
            .query({_id: 'said'})
            .catch(err => {
              expect(err.status).toBe(400);
              done();
            });
        });
      });
    });

    describe('PUT requests', ()=> {
      describe('Valid requests', () => {
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


    describe('DELETE requests', () => {
      describe('Valid Requests', () => {
        test('should remove the record from the toy dir', done => {
          superagent.delete(':3000/api/toy')
            .query({_id: this.mockToy._id})
            .then(res => {
              this.resDelete = res;
              expect(res.status).toBe(204);
              done();
            });
        });
      });
      test('should remove the record from the toy dir', done => {
        fs.readdirProm(`${__dirname}/../../data/toy`)
          .then(files => {
            console.log(files);
            let expectedFalse = files.includes(`${this.mockToy._id}.json`);
            expect(expectedFalse).toBeFalsy();
            console.log(expectedFalse);
            done();
          });
      });
    });

    describe('invalid requests', () => {
      test('should return an error if we sent nothing with no id to delete', done => {
        superagent.delete(':3000/api/toy')
          .query({_id: 246})
          .catch(res => {
            this.resDelete = res;
            expect(res.status).toBe(404);
            done();
          });
      });
    });
  });
});
