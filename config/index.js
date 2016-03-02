'use strict'

const processToConfig = {
  'development': './env/dev',
  'test': './env/test'
}

const { NODE_ENV = 'development' } = process.env

module.exports = require(processToConfig[NODE_ENV])
