'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProblemsSchema extends Schema {
  up () {
    this.create('problems', (table) => {
      table.increments()
      table.string('title')
      table.text('description')
      table.integer('view')
      table.timestamps()
      table.datetime('deleted_at')
    })
  }

  down () {
    this.drop('problems')
  }
}

module.exports = ProblemsSchema
