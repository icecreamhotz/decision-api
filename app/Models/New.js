'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class New extends Model {
  static boot () {
    super.boot()
    this.addTrait('@provider:Lucid/SoftDeletes')
  }

  new_images () {
    return this.hasMany('App/Models/NewImage')
  }
}

module.exports = New
