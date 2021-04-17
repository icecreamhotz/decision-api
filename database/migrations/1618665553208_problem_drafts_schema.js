'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProblemDraftsSchema extends Schema {
  up () {
    this.create('problem_drafts', (table) => {
      table.increments()
      table.string('title')
      table.timestamps()
      table.datetime('deleted_at')
    })
  }

  down () {
    this.drop('problem_drafts')
  }
}

module.exports = ProblemDraftsSchema
