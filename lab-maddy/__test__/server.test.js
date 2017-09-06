'use strict';

const server = require('../server');
// const storage = require('../lib/storage');
// const router = require('../lib/router');
const superagent = require('superagent');


//This is the template we were given but I don't completely understand beforeAll and afterAll.
describe('This is a test to make sure server.js is working...', function() {
  // beforeAll(() => {});
  afterAll((done) => {
    server.close(done);
  });

  //   describe('default properties', () => {
  //     test('should have ...', done => {
  //       expect(true).toBeTrue;
  //       done();
  //     });
  //   });
  // });


  describe('POST method, endpoint', ()=>{
    test('POST should return status code 201 and response', done => {
      superagent.post('localhost:3000/api/toy')
        .set('Content-Type', 'application/json')
        .send({})
        .end((err, res)=> {
          expect(err).not.toBeNull();
          expect(res.status).toBe(400);
          done();
        });
    });
    test('Should return name and desc of toy user posted', done=> {
      superagent.post('localhost:3000/api/toy')
        .type('application/json')
        .send({
          name: 'barney',
          desc: 'purple dino',
          price: '$10',
          material: 'plastic'
        })
        .end((err, res)=> {
          this.toy = JSON.parse(res.text);
          this.aNewID = res.body._id;
          expect(this.toy.name).toEqual('barney');
          expect(this.toy.material).toEqual('plastic');
          expect(this.toy.desc).toEqual('purple dino');
          expect(this.toy.price).toEqual('$10');
          expect(res.status).toEqual(201);
          done();
        });
    });
  });
});










// ## Tests _make an attempt at TDD today!!_
//   _note: Your tests should still function correctly as you iterate and refactor your code. Do not start writing a refactor until you have functional tests._

// * write a test to ensure that your api returns a status code of 404 for routes that have not been registered

// * write tests to ensure the `/api/simple-resource-name` endpoint responds as described for each condition below:
//* `GET`: test 404, it should respond with 'not found' for valid requests made with an id that was not found
//* `GET`: test 400, it should respond with 'bad request' if no id was provided in the request

//* `GET`: test 200, it should contain a response body for a request made with a valid id


//* `POST`: test 400, it should respond with 'bad request' if no request body was provided or the body was invalid
//* `POST`: test 201, it should respond with the body content for a post request with a valid body
//* `PUT`: test 400, it should respond with 'bad request' if no request body was provided or the body was invalid

//* `PUT`: test 204, it should respond with no body content for a put request with a valid body


//* `DELETE`: test 400, it should respond with 'bad request' if no resource id was provided
//* `DELETE`: test 404, it should respond with 'not found' for valid requests made with an id that was not found
//* `DELETE`: test 204, it should respond with no body content for a request request with a valid resource id
