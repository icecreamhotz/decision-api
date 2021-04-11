'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ProblemChild extends Model {
  static boot () {
    super.boot()
  }

  static get table () {
    return 'problem_childs'
  } 

  getIsTrue(value) {
    return !!value
  }
  
  getIsFalse(value) {
    return !!value
  }
}

module.exports = ProblemChild
