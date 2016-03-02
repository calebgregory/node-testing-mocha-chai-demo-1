'use strict'

const fs = require('fs')

const express = require('express')
const bodyParser = require('body-parser')

const app = express()

const { IS_A_TEST, USERS_FILE } = require('../config')

app.set('port', process.env.PORT || 3000)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const getUser = (req, res) => {
  const id = parseInt(req.params['id'])

  return fs.readFile(USERS_FILE, (err, data) => {
    if(err) throw err
    const users = JSON.parse(data)
    const user = users
      .filter(user => user.id === id)[0]

    return res.status(200).json(user || { message: 'User not found' })
  })
}

app.get('/user/:id', getUser)
app.get('/user', (req, res) => {
  return res.status(400).send('no-k')
})

const postUser = (req, res) => {
  const newUser = req.body

  if (Object.keys(newUser).length === 0 && JSON.stringify(newUser) === JSON.stringify({})) { // ~ gross
    return res.status(400).json({ message: 'No user was sent' })
  }

  return fs.readFile(USERS_FILE, (err, data = []) => {
    if(err) throw err
    const oldUsers = JSON.parse(data)
    const nextUsers = oldUsers.concat(newUser)

    fs.writeFile(USERS_FILE, JSON.stringify(nextUsers, null, 4), (err) => {
      res.setHeader('Cache-Control', 'no-cache')
      res.status(200).json(nextUsers)
    })
  })
}
app.post('/user', postUser)

if (!IS_A_TEST) {
  const server = app.listen(app.get('port'), (err) => {
    if (err) throw err
    console.log(`(>'')>*<(''<) App listening on http://localhost:${server.address().port}`)
  })
}

module.exports = app
