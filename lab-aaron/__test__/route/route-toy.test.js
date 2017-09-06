'use strict';

const server = require('../../server.js');
const superagent = require('supergent');

describe('#route-toy-test', () => {

  afterAll((done) => {
    server.close(() => done());
  });
  describe('bad route', () => {
    describe('no endpoint', () => {
      test('should return 404', done => {
        superagent.post('localhost:3000/toy/api')
          .set('Content-Type', 'application/json')
          .send({});
        expect((err, res) => {
          expect(err).not.toBeNull();
          expect(res.status).toBe(400);
          done();
        });
      });
    });
  });

  describe('#post method', () => {
    describe('post method endpoint', ()=> {
      test('should return 400 ', done => {
        superagent.post('localhost:3000/toy/api')
          .set('Content-Type', 'application/json')
          .send({})
          .end((err, res) => {
            expect(err).not.toBeNull();
            expect(res.status).toB(400);
            done();
          });
      });

    });
  });
});
