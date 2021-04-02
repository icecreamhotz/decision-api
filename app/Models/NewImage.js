'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Env = use('Env')

class NewImage extends Model {
  static boot () {
    super.boot()
  }

  static get computed () {
    return ['url']
  }

  getUrl ({ name }) {
    return name ? `${Env.get('BASE_URL')}/public/${name}` : null
  }
}

module.exports = NewImage
