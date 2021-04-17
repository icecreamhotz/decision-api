'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProblemsSchema extends Schema {
  up () {
    this.table('problems', (table) => {
      table.integer('score').after('is_head')
    })
  }

  down () {
    this.table('problems', (table) => {
      table.dropColumn('score')
    })
  }
}

module.exports = ProblemsSchema
