const Promise = require('bluebird')
// const fs = Promise.promisifyAll(requre('fs'), )

describe('testing toy routes', function(){
  afterAll(done => server.close(done))


  describe('all requests to /api/toy', () => {
    describe('POST requests', () => {
      //any one test should be self-contained so for production level shit do this

      // beforeAll(() => {
      //   //set up just the POST tests
      // })
      // afterAll(() => {
      //   //tear down just the POST tests
      // })
      test('should create and return a new toy, given a valid request', done => {
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
            //google regex patterns for uuid
            done()
            //if you don't put done, you will get a false positive - make sure it is inside your callback
          })
        done()
      })
    })
    describe('DELETE requests', () => {
      describe('valid requests', () => {
        beforeAll(done => {
          superagent.delete(':3000/api/toy')
            .query({_id: this.mockToy._id})
            .then(res => {
              this.resDelete = res
              done()
            })
        })
        test('should remove the record from the toy dir', done => {
          fs.readdirProm(`${__dirname}/../../data/toy`)
            .then(files => {
              console.log(files)
              let expectedFalse = files.includes(`${this.mockToy._id}.json`)
              expect(expectedFalse).toBeFalsy()
              done()
            })
        })
      })
      describe('invalid requests', () => {

      })
    })
  })
})
