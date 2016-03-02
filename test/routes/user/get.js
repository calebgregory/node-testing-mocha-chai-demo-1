'use strict'

const { expect } = require('chai')
const request = require('supertest')

const app = require('../../../app')

describe.only('routes', () => {
  describe('/user/:id', () => {
    it('returns a 400 if no :id is included', (done) => {
      request(app)
        .get('/user')
        .expect(400)
        .end(done)
    })

    it('returns json', (done) => {
      request(app)
        .get('/user/1')
        .expect('Content-Type', /json/)
        .end(done)
    })

    it('return a 200 if :id provided', (done) => {
      request(app)
        .get('/user/1')
        .expect(200)
        .end(done)
    })

    it('returns response with "name" property', (done) => {
      request(app)
        .get('/user/1')
        .end((err, res) => {
          expect(res.body).to.have.property('name')
        })
    })
    it('returns response with "age" property', (done) => {
      request(app)
        .get('/user/1')
        .end((err, res) => {
          expect(res.body).to.have.property('age')
        })
    })

  })
})
