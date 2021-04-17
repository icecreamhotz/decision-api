'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProblemsSchema extends Schema {
  up () {
    this.table('problems', (table) => {
      table.boolean('is_head').defaultTo(false).after('view')
    })
  }

  down () {
    this.table('problems', (table) => {
      table.dropColumn('is_head')
    })
  }
}

module.exports = ProblemsSchema
