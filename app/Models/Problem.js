'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Problem extends Model {
  static boot () {
    super.boot()
    this.addTrait('@provider:Lucid/SoftDeletes')
  }
  
  childs () {
    return this.hasMany('App/Models/ProblemChild')
  }
}

module.exports = Problem
