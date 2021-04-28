'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Env = use('Env')

class Problem extends Model {
  static boot () {
    super.boot()
    this.addTrait('@provider:Lucid/SoftDeletes')
    this.addTrait('Searchable')
  }

  getIsHead(value) {
    return !!value
  }
  
  childs () {
    return this.hasMany('App/Models/ProblemChild')
  }

  problem_category () {
    return this.belongsTo('App/Models/ProblemCategory')
  }

  getFilename (filename) {
    return filename ? `${Env.get('BASE_URL')}/public/${filename}` : null
  }
}

module.exports = Problem
