'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProblemsSchema extends Schema {
  up () {
    this.table('problems', (table) => {
      table.text('detail').after('title')
    })
  }

  down () {
    this.table('problems', (table) => {
      table.dropColumn('detail')
    })
  }
}

module.exports = ProblemsSchema
