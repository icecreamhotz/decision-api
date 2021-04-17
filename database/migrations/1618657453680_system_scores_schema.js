'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SystemScoresSchema extends Schema {
  up () {
    this.create('system_scores', (table) => {
      table.increments()
      table.datetime('date')
      table.integer('score')
    })
  }

  down () {
    this.drop('system_scores')
  }
}

module.exports = SystemScoresSchema
