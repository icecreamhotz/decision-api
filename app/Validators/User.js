'use strict'

const BaseValidator = require('./BaseValidator')

class User extends BaseValidator {
  get rules () {
    const baseRules = {
      username: 'required',
      password: 'required',
      email: 'required|email',
      firstname: 'required',
      lastname: 'required',
      tel: 'required',
      role: 'required'
    }
    if (this.ctx.request.method() === 'PUT') {
      delete baseRules.username
      delete baseRules.password
    }
    return baseRules
  }
}

module.exports = User
