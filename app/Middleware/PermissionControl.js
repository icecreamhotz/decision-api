'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const User = use('App/Models/User')

class PermissionControl {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle (ctx, next, props) {
    let allow = false
    try {
      let roleUserData = User.query()
        .select('id')
        .where('id', ctx.auth.user.id)
        .whereIn('role', props)
      roleUserData = await roleUserData.first()
      allow = !!roleUserData
    } catch (err) {
      console.error(err)
      return ctx.response.internalServerError()
    }

    if (!allow) {
      return ctx.response.unauthorized()
    }

    return await next()
  }
}

module.exports = PermissionControl
