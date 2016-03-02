'use strict'

const express = require('express')

const app = express()

const { IS_A_TEST } = require('../config')

app.set('port', process.env.PORT || 3000)

app.get('/user/:id', (req, res) => {
  return res.status(200).send('ok')
})

if (!IS_A_TEST) {
  const server = app.listen(app.get('port'), (err) => {
    if (err) throw err
    console.log(`(>'')>*<(''<) App listening on http://localhost:${server.address().port}`)
  })
}

module.exports = app
