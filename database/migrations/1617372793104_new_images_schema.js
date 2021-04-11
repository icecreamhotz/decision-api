'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class NewImagesSchema extends Schema {
  up () {
    this.create('new_images', (table) => {
      table.increments()
      table.integer('new_id').unsigned().index().notNullable()
      table.string('name')
      table.timestamps()
    })
  }

  down () {
    this.drop('new_images')
  }
}

module.exports = NewImagesSchema
