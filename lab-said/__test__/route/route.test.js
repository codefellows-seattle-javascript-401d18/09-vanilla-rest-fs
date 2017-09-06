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

    });
    describe('GET requests', () => {
      test('should get the record from the toy dir', done => {

        superagent.get(':3000/api/toy')
          .query({_id: this.mockToy._id})
          .then(res => {
            this.resGst = res;
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



    describe('PUT requests', () => {
      test('should have ...', done => {
        done();
      });
    });
    describe('DELETE requests', () => {
      describe('Valid Requests', () => {
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
              console.log(files);
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
