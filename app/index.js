'use strict'

const fs = require('fs')

const express = require('express')

const app = express()

const { IS_A_TEST, USERS_FILE } = require('../config')

app.set('port', process.env.PORT || 3000)

const getUser = (req, res) => {
  const { id } = req.params

  fs.readFile(USERS_FILE, (err, data) => {
    if(err) throw err
    const users = JSON.parse(data)
    const user = users
      .filter(user => user.id === parseInt(id))[0]

    return res.status(200).json(user || { message: 'User not found' })
  })

}

app.get('/user/:id', getUser)
app.get('/user', (req, res) => {
  return res.status(400).send('no-k')
})

if (!IS_A_TEST) {
  const server = app.listen(app.get('port'), (err) => {
    if (err) throw err
    console.log(`(>'')>*<(''<) App listening on http://localhost:${server.address().port}`)
  })
}

module.exports = app
