'use strict'

const BaseValidator = require('./BaseValidator')

class Auth extends BaseValidator {
  get rules() {
    return {
      username: 'required',
      password: 'required',
    }
  }
}

module.exports = Auth
