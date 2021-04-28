'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProblemsSchema extends Schema {
  up () {
    this.table('problems', (table) => {
      table.string('filename')
    })
  }

  down () {
    this.table('problems', (table) => {
      table.dropColumn('filename')
    })
  }
}

module.exports = ProblemsSchema
