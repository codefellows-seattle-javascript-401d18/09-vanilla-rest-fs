'use strict';

const server = require('../../server.js');
const superagent = require('superagent');

describe('Testing the route-toy.js file', function() {
  // let returnRes;
  afterAll((done) => {
    server.close(done);
  });
  describe('Using POST method, /api/toy endpoint', () => {
    test('A POST request without body shoud return 400', done => {
      superagent.post(':3000/api/toy')
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(res.status).toBe(400);
          done();
        });
    });

    test('', done => {
      superagent.post(':3000/api/toy')
        .send({'name': 'zipper', 'desc': 'stuffed animal cat with zip up coat'})
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          this.returnRes = res;
          expect(res.status).toBe(201);
          done();
        });
    });

    // test('', done => {
    //   superagent.post(':3000/api/toy')
    //     .set('Content-Type', '')
    //     .end((err, res) => {
    //       expect().toBe();
    //       done();
    //     });
    // });
  });

  describe('Using GET method, /api/toy endpoint', () => {
    test('Request made with valid id should return 200', done => {
      superagent.get(`:3000/api/toy?_id=${this.returnRes.body._id}`)
        .set('Content-Type', 'text/plain')
        .end((err, res) => {
          expect(res.status).toBe(200);
          done();
        });
    });

    test('A valid id w/id not found should return 404', done => {
      superagent.get(':3000/api/toy?_id=5532439a-a7da-4f9e-a3d2-4f827b611624')
        .set('Content-Type', 'text/plain')
        .end((err, res) => {
          expect(res.status).toBe(404);
          done();
        });
    });

    test('No id provided should return 400', done => {
      superagent.get(':3000/api/toy')
        .set('Content-Type', 'text/plain')
        .end((err, res) => {
          expect(res.status).toBe(400);
          done();
        });
    });

  });


});
