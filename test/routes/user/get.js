'use strict'

const fs = require('fs')

const { expect } = require('chai')
const request = require('supertest')

const { USERS_FILE } = require('../../../config')
const app = require('../../../app')

describe('routes', () => {
  describe('/user/:id', () => {
    describe('GET', () => {
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
        const userId = 1
        const database = JSON.stringify([
          { "id": userId, "name": "samantha" }
        ])
        fs.writeFile(USERS_FILE, database, (err) => {
          if (err) return done(err)

          request(app)
            .get(`/user/${userId}`)
            .end((err, res) => {
              expect(res.body).to.have.property('name')
              done()
            })
        })
      })

      it('returns response with "age" property', (done) => {
        const userId = 1
        const database = JSON.stringify([
          { "id": userId, "age": 666 }
        ])
        fs.writeFile(USERS_FILE, database, (err) => {
          if (err) return done(err)

          request(app)
            .get(`/user/${userId}`)
            .end((err, res) => {
              expect(res.body).to.have.property('age')
              done()
            })
        })
      })

      it('returns message "User not found" if no user is found', (done) => {
        const database = JSON.stringify([])
        fs.writeFile(USERS_FILE, database, (err) => {
          if (err) return done(err)

          request(app)
            .get('/user/1')
            .end((err, res) => {
              expect(res.body).to.eql({ message: "User not found" })
              done()
            })
        })
      })
    })
  })
})
