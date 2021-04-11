'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DocumentProblemsSchema extends Schema {
  up () {
    this.create('document_problems', (table) => {
      table.increments()
      table.string('name')
      table.string('file')
      table.timestamps()
      table.datetime('deleted_at')
    })
  }

  down () {
    this.drop('document_problems')
  }
}

module.exports = DocumentProblemsSchema
