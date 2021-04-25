'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProblemCategoriesSchema extends Schema {
  up () {
    this.create('problem_categories', (table) => {
      table.increments()
      table.string('name')
      table.timestamps()
      table.datetime('deleted_at')
    })
  }

  down () {
    this.drop('problem_categories')
  }
}

module.exports = ProblemCategoriesSchema
