'use strict'

const Toy = require('../model/toy')
const storage = require('../lib/storage')
const response = require('../lib/response')
const debug = require('debug')('http:route-toy')

module.exports = function(router) {

  router.post('/api/toy', (req, res) => {
    debug('/api/toy POST')
    try {
      let newToy = new Toy(req.body.name, req.body.desc)
      storage.create('toy', newToy)
        .then(toy => response.sendJson(res, 201, toy))
    } catch(e) {
      console.error(e)
      response.sendText(res, 400, `bad request: ${e.message}`)
    }
  })

  router.get('/api/toy', (req, res) => {
    debug('/api/toy GET')
    if(req.url.query._id) {
      storage.fetchOne('toy', req.url.query._id)
        .then(toy => {
          response.sendJson(res, 200, toy)
        })
        .catch(err => {
          console.error(err)
          response.sendText(res, 404, `bad request; could not find record, ${err.message}`)
        })
      return
    }
    response.sendText(res, 400, 'bad request; item id required to get record')
  })

  router.put('/api/toy', (req, res) => {
    debug('/api/toy PUT')
    if (req.url.query._id) {
      if(!req.body._id && !req.body.name && !req.body.desc) {
        response.sendJson(res, 400, `bad request; body improperly formatted`)
        return
      }
      storage.update('toy', req.body)
        .then(() => {
          res.writeHead(204, {'Content-Type': 'text/plain'})
          res.end()
          return
        })
        .catch(err => {
          res.writeHead(400, {'Content-Type': 'application/json'})
          res.write(`bad request; ${err.message}`)
          res.end()
          return
        })
      return
    }
  })

  router.delete('/api/toy', (req, res) => {
    debug('/api/toy DELETE')
    if(req.url.query._id) {
      storage.delete('toy', req.url.query._id)
        .then(() => {
          res.writeHead(204, {'Content-Type': 'text/plain'})
          res.end()
          return
        })
        .catch(err => {
          response.sendJson(res, 400, `bad request; ${err.message}`)
          return
        })
      return
    }
    response.sendJson(res, 400, 'bad request; item id required to get record')
  })
}
