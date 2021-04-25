'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProblemsSchema extends Schema {
  up () {
    this.table('problems', (table) => {
      table.integer('problem_category_id').unsigned().index().notNullable().after('id')
    })
  }

  down () {
    this.table('problems', (table) => {
      table.dropColumn('problem_category_id')
    })
  }
}

module.exports = ProblemsSchema
