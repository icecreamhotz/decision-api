'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProblemChildsSchema extends Schema {
  up () {
    this.create('problem_childs', (table) => {
      table.increments()
      table.integer('problem_id').unsigned().index().notNullable()
      table.integer('child_problem_id').unsigned().index().notNullable()
      table.boolean('is_true')
      table.boolean('is_false')
      table.timestamps()
    })
  }

  down () {
    this.drop('problem_childs')
  }
}

module.exports = ProblemChildsSchema
