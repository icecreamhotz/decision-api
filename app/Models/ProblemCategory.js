'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ProblemCategory extends Model {
  static boot () {
    super.boot()
    this.addTrait('@provider:Lucid/SoftDeletes')
  }
  
  static get table () {
    return 'problem_categories'
  }
}

module.exports = ProblemCategory
