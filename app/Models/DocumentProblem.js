'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Env = use('Env')

class DocumentProblem extends Model {
  static boot () {
    super.boot()
    this.addTrait('@provider:Lucid/SoftDeletes')
  }

  getFile (filename) {
    return filename ? `${Env.get('BASE_URL')}/public/${filename}` : null
  }
}

module.exports = DocumentProblem
