'use strict'
'use strict'

const fs = require('fs')

const { expect } = require('chai')
const request = require('supertest')

const { USERS_FILE } = require('../../../config')
const app = require('../../../app')

describe('routes', () => {
  describe('/user', () => {
    describe('POST', () => {
      beforeEach((done) => {
        fs.writeFile(USERS_FILE, JSON.stringify([]), done) // clobber database
      })

      it('returns json', (done) => {
        request(app)
          .post('/user')
          .expect('Content-Type', /json/)
          .end(done)
      })

      it('returns a 400 if no req.body', (done) => {
        request(app)
          .post('/user')
          .expect(400)
          .end(done)
      })

      it('returns a 200 if req.body', (done) => {
        request(app)
          .post('/user')
          .send({ id: 1, name: 'SATAN' })
          .expect(200)
          .end(done)
      })

      it('adds record to database', (done) => {
        const user = { id: 1, name: 'SATAN' }
        request(app)
          .post('/user')
          .send(user)
          .end((err, res) => {
            fs.readFile(USERS_FILE, (err, data) => {
              if (err) return done(err)
              const database = JSON.parse(data)
              const newUser = database[0]
              expect(newUser['id']).to.equal(1)
              expect(newUser['name']).to.equal('SATAN')
              done()
            })
          })

      })
    })
  })
})
