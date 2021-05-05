'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EventsSchema extends Schema {
  up () {
    this.create('events', (table) => {
      table.increments()
      table.datetime('start')
      table.datetime('end')
      table.string('title')
      table.text('description')
      table.timestamps()
      table.datetime('deleted_at')
    })
  }

  down () {
    this.drop('events')
  }
}

module.exports = EventsSchema
