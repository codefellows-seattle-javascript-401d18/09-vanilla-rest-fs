'use strict';

const server = require('../server.js');
const superagent = require('superagent');
const cowsay = require('cowsay');


describe('Testing the server file', function () {
  afterAll((done) => {
    server.close(done);
  });

  describe('POST  method', () => {
    test('POST on /cowsay endpoint - should return status code 200', done => {
      superagent.post('localhost:3000/cowsay')
        .send({'text': 'hello'})
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(err).toBeNull();
          expect(res.status).toBe(200);
          done();
        });
    });

    test('POST on /cowsay endpoint - should return status code 400', done => {
      superagent.post('localhost:3000/cowsay')
        .send({'name': 'hello'})
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(err).not.toBeNull();
          expect(res.status).toBe(400);
          done();
        });
    });

    test('POST on /cowsay endpoint -  should return cowsay dragon message', done => {
      superagent.post('localhost:3000/cowsay')
        .send({'text': 'hello'})
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(err).toBeNull();
          expect(res.text).toEqual(cowsay.say({text: 'hello', f: 'dragon'}));
          done();
        });
    });

    test('POST on / endpoint - should return status code 200', done => {
      superagent.post('localhost:3000/')
        .send({'text': 'hello'})
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(err).toBeNull();
          expect(res.status).toBe(200);
          done();
        });
    });

    test('POST on / endpoint - should return hello message', done => {
      superagent.post('localhost:3000/')
        .send({'text': 'hello'})
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(err).toBeNull();
          expect(res.text).toEqual('hello from my server!');
          done();
        });
    });
  });

  describe('GET method', () => {
    test('GET on /cowsay endpoint - should return status code 200', done => {
      superagent.get('localhost:3000/cowsay?text=hello')
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(err).toBeNull();
          expect(res.status).toBe(200);
          done();
        });
    });

    test('GET on /cowsay endpoint - should return status code 400', done => {
      superagent.get('localhost:3000/cowsay?name=hello')
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(err).not.toBeNull();
          expect(res.status).toBe(400);
          done();
        });
    });

    test('GET on /cowsay endpoint - should return cowsay dragon message', done => {
      superagent.get('localhost:3000/cowsay?text=hello')
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(err).toBeNull();
          expect(res.text).toEqual(cowsay.say({text: 'hello', f: 'dragon'}));
          done();
        });
    });

    test('GET on / endpoint - should return status code 200', done => {
      superagent.get('localhost:3000/')
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(err).toBeNull();
          expect(res.status).toBe(200);
          done();
        });
    });

    test('GET on / endpoint - should return hello message', done => {
      superagent.get('localhost:3000/')
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(err).toBeNull();
          expect(res.text).toEqual('hello from my server!');
          done();
        });
    });
  });
});
