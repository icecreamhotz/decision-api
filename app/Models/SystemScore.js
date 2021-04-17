'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class SystemScore extends Model {
  static boot () {
    super.boot()
  }

  static get createdAtColumn () {
    return false
  }

  static get updatedAtColumn () {
    return false
  }
}

module.exports = SystemScore
