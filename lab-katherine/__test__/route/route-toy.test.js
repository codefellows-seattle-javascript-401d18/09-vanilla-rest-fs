// 'use strict'
//
// const superagent = require('superagent')
// const server = require('../../server')
// require('jest')
//
// const Promise = require('bluebird')
// const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'})
//
// describe('testing toy routes', function(){
//   afterAll(done => server.close(done))
//   describe('all requests to /api/toy', () => {
// describe('POST requests', () => {
//   test('should create and return a new toy, given a valid request', done => {
//     superagent.post(':3000/api/toy')
//       .type('application/json')
//       .send({
//         name: 'barney',
//         desc: 'purple dino'
//       })
//       .then(res => {
//         this.mockToy = res.body
//         expect(res.status).toBe(201)
//         expect(this.mockToy.name).toBe('barney')
//         expect(this.mockToy.desc).toBe('purple dino')
//         expect(this.mockToy).toHaveProperty('_id')
//         done()
//       })
//     done()
//   })
// })
//
//     describe('DELETE requests', () => {
//       describe('valid requests', () => {
//         beforeAll(done => {
//           console.log('mockToy', this.mockToy._id)
//           superagent.delete(':3000/api/toy?_id' + this.mockToy._id)
//             // .query({_id: this.mockToy._id})
//             .then(res => {
//               this.resDelete = res
//               done()
//             })
//         })
//         test('should remove the record from the toy dir', done => {
//           fs.readdirProm(`${__dirname}/../../data/toy`)
//             .then(files => {
//               console.log(files)
//               let expectedFalse = files.includes(`${this.mockToy._id}.json`)
//               expect(expectedFalse).toBeFalsy()
//               done()
//             })
//         })
//       })
//       describe('invalid requests', () => {
//
//       })
//     })
//   })
// })

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
            console.log(res.body)
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
      xtest('200 should contain a response body for a request made with a valid id', done => {
        superagent.get(':3000/api/toy')
          .query({'_id': '0c6ecde2-513c-4956-b681-95afa785b973'})
          .type('application/json')
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
      test('400 should respond with "bad request" if no request body was provided or the body was invalid'), done => {
        superagent.put(':3000/api/toy')
          .query({'_id': '0c6ecde2-513c-4956-b681-95afa785b973'})
          .type('application/json')
          .send({})
          .then(res => {
            expect(res.status).toEqual(400)
            done()
          })
        done()
      }
    })
  })
})
