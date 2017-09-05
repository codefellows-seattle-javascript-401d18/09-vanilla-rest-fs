'use strict'

const server = require('../../server.js')
const superagent = require('superagent')

describe('testing toy routes', function(){
  afterAll((done) => {
    server.close(() => done())
  })

  describe('no endpoint', () => {
    test('return 404 if routes not registered', done => {
      superagent.post(':3000/api/death')
        .set('Content-Type', 'application/json')
        .send({})
        .end((err, res) => {
          expect(err).not.toBeNull()
          expect(res.status).toBe(404)
          done()
        })
    })
  })

  describe('all requests to /api/toy', () => {

    describe('#POST method', () => {
      test('400 should respond with "bad request" if no request body was provided or the body was invalid', done => {
        superagent.post(':3000/api/toy')
          .type('application/json')
          .send({
            name: '',
            desc: ''
          })
          .then((err, res) => {
            // this.mockToy = res.body
            expect(err).not.toBeNull()
            expect(res.status).toBe(400)
            done()
          })
        done()
      })
      test('201 should create and return a new toy, given a valid request', done => {
        superagent.post(':3000/api/toy')
          .type('application/json')
          .send({
            name: 'barney',
            desc: 'purple dino'
          })
          .then(res => {
            this.mockToy = res.body
            expect(res.status).toBe(201)
            expect(this.mockToy.name).toBe('barney')
            expect(this.mockToy.desc).toBe('purple dino')
            expect(this.mockToy).toHaveProperty('_id')
            done()
          })
        done()
      })
    })

    describe('#GET method', () => {
      test('404 should respond with "not found" for valid requests made with an id that was not found', done => {
        superagent.get(':3000/api/toy')
          .query({'_id': '5885'})
          .type('application/json')
          .then(res => {
            expect(res.status).toBe(404)
            done()
          })
        done()
      })
      test('400 should respond with bad request if no id', done => {
        superagent.get(':3000/api/toy')
          .query({'_id': ''})
          .then(res => {
            expect(res.status).toEqual(400)
            done()
          })
        done()
      })
      test('200 should contain a response body for a request made with a valid id', done => {
        superagent.get(':3000/api/toy')
          .type('application/json')
          .query({'_id': 'aaab23a2-a5c1-4e77-b740-bb9e48da436e'})
          .then(res => {
            expect(res.body.name).toEqual('barney')
            expect(res.body.desc).toEqual('purple dino')
            expect(res.status).toEqual(200)
            done()
          })
        done()
      })
    })

    describe('#PUT method', () => {
      test('400 should respond with "bad request" if no request body was provided or the body was invalid', done => {
        superagent.put(':3000/api/toy')
          .type('text/plain')
          .query({'_id': ''})
          .then(res => {
            expect(res.status).toEqual(400)
            done()
          })
        done()
      })
      test('204 should respond with no body content for a put request with a valid body', done => {
        superagent.put(':3000/api/toy')
          .query({'_id': '50d053d1-df2c-4101-b07b-09a6b546e848'})
          .send({
            'name': 'better barney',
            'desc': 'better purple dino',
            '_id': '50d053d1-df2c-4101-b07b-09a6b546e848'
          })
          .type('application/json')
          .then(res => {
            expect(res.status).toEqual(204)
            done()
          })
        done()
      })
    })

    describe('#DELETE method', () => {
      test('400 should respond with "bad request" if no resource id was provided', done => {
        superagent.delete(':3000/api/toy')
          .type('text/plain')
          .query({'_id': ''})
          .then(res => {
            expect(res.status).toEqual(400)
            done()
          })
        done()
      })
      test('404 should respond with "not found" for valid requests made with an id that was not found', done => {
        superagent.delete(':3000/api/toy')
          .type('text/plain')
          .query({'_id': '5885'})
          .then(res => {
            expect(res.status).toEqual(404)
            done()
          })
        done()
      })
      test('204 should respond with no body content for a request request with a valid resource id', done => {
        superagent.delete(':3000/api/toy')
          .type('text/plain')
          .query({'_id': '8034ccf9-9bfd-4ffb-877c-cf159fdbedcd'})
          .then(res => {
            expect(res.status).toEqual(204)
            done()
          })
        done()
      })
    })
  })
})
