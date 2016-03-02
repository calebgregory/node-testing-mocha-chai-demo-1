'use strict'

const { expect } = require('chai')

const ava = require('../../lib/ava')

describe('ava', () => {
  describe('player', () => {
    it('creates a player with a name', () => {
      const name = 'ANDREW'
      const newPlayer = ava.player({ name: 'ANDREW' })

      expect(newPlayer['name']).to.equal(name)
    })

    it.only('creates a player with an "_id"', () => {
      const name = 'ANDERSON'
      const newPlayer = ava.player({ name })

      expect(newPlayer).to.have.property('_id')
    })

    it('creates a player with an energy level', () => {
      const name = 'ANDREW'
      const energyLevel = 10
      const newPlayer = ava.player({ name, energyLevel })

      expect(newPlayer).to.have.property('energyLevel')
    })

    it('creates a player with a default energy level of 10 if none is specified', () => {
      const name = 'ANDREW'
      const newPlayer = ava.player({ name })

      expect(newPlayer['energyLevel']).to.equal(10)
    })
  })
})
