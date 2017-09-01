const server = require('/Users/Gavin/codefellows/401/labs/08-vanilla-rest-api/lab-gavin/server.js');
const superagent = require('superagent');

describe('#ROUTE-TOY-TEST', () => {

  afterAll((done) => {
    server.close(() => done());
  });
  describe('#POST', () => {
    describe('POST method, endpoint', () => {
      test('should return 400 when user inputs invalid url call', done => {
        superagent.post('localhost:3000/toy/api')
          .set('Content-Type', 'text/plain')
          .end((err, res) => {
            expect(err).not.toBeNull();
            expect(res.status).toBe(400);
            done();
          });
      });

      test('Should return name and desc of toy user posted', done => {
        superagent.post('localhost:3000/api/toy')
          .send({'name': 'PowerRanger', 'desc': 'Totally Awesome Red Ranger'})
          .type('application/json')
          .end((err, res) => {
            this.toy = JSON.parse(res.text);
            this.aNewID = res.body._id;
            expect(this.toy.name).toEqual('PowerRanger');
            expect(this.toy.desc).toEqual('Totally Awesome Red Ranger');
            expect(res.status).toEqual(201);
            done();
          });
        // console.log(aNewID);
      });
    });
  });


  describe('#GET', () => {
    describe('GET method endpoint', () => {
      test('should return 404 when user requests with an invalid or not found ID', done => {
        superagent.get('localhost:3000/api/toy')
          .send({'_id': '3875983795'})
          .type('application/json')
          .end((err, res) => {
            expect(err).not.toBeNull();
            expect(res.status).toBe(400);
            done();
          });
      });

      test('Should return 400 if no ID was provided', done => {
        superagent.get('localhost:3000/api/toy')
          .send({})
          .type('application/json')
          .end((err, res) => {
            expect(res.body.name).toEqual(undefined);
            expect(res.status).toEqual(400);
            done();
          });
      });

      test('Should return user with toy information from an ID', done => {
        superagent.get('localhost:3000/api/toy')
          .query({'_id': this.toy._id})
          .type('application/json')
          .end((err, res) => {
            expect(res.body.name).toEqual('PowerRanger');
            expect(res.body.desc).toEqual('Totally Awesome Red Ranger');
            expect(res.status).toEqual(200);
            done();
          });
      });
    });
  });

  describe('#DELETE', () => {
    describe('DELETE method endpoint', () => {
      test('should return 400 if no resource ID was provided', done => {
        superagent.delete('localhost:3000/api/toy')
          .set('Content-Type', 'text/plain')
          .end((err, res) => {
            expect(err).not.toBeNull();
            expect(res.status).toBe(404);
            done();
          });
        //unlink to delete
      });

      test('Should return 404 for valid requests made with an ID that was not found', done => {
        superagent.delete('localhost:3000/api/toy')
          .query({'_id': '23235232235'})
          .type('application/json')
          .end((err, res) => {
            expect(err).toBeNull();
            expect(res.status).toBe(204);
            done();
          });
      });


      test('Should respond with 204 no body content for a request with a valid resource ID.', done => {
        superagent.delete('localhost:3000/api/toy')
          .query({_id: this.toy._id})
          .type('application/json')
          .end((err, res) => {
            expect(res.status).toEqual(204);
            done();
          });
      });
    });
  });

  describe('#PUT', () => {
    describe('POST method endpoint', () => {
      test('should return 400 if no request body or bad request body', done => {
        superagent.put('localhost:3000/api/toy')
          .set('Content-Type', 'text/plain')
          .end((err, res) => {
            expect(err).not.toBeNull();
            expect(res.status).toBe(400);
            done();
          });
      });

      test('Should respond with no body content for a put request with a valid body', done => {
        superagent.put('localhost:3000/api/toy')
          .query({_id: this.toy._id})
          .send({'name': 'PowerRanger', 'desc': 'Totally Awesome Red Ranger', '_id': '${this.toy._id}'})
          .type('application/json')
          .end((err, res) => {
            expect(res.status).toEqual(400);
            done();
          });
      });
    });
  });
});
