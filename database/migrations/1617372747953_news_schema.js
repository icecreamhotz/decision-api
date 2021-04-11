'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class NewsSchema extends Schema {
  up () {
    this.create('news', (table) => {
      table.increments()
      table.string('name')
      table.text('description')
      table.timestamps()
      table.datetime('deleted_at')
    })
  }

  down () {
    this.drop('news')
  }
}

module.exports = NewsSchema
