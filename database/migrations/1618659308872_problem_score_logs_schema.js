'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProblemScoreLogsSchema extends Schema {
  up () {
    this.create('problem_score_logs', (table) => {
      table.increments()
      table.integer('problem_id').unsigned().index().notNullable()
      table.datetime('date')
      table.integer('score')
    })
  }

  down () {
    this.drop('problem_score_logs')
  }
}

module.exports = ProblemScoreLogsSchema
