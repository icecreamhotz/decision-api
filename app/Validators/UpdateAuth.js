'use strict'

const BaseValidator = require('./BaseValidator')

class UpdateAuth extends BaseValidator {
  get rules () {
    return {
      email: 'required|email',
      firstname: 'required',
      lastname: 'required',
      tel: 'required|integer|min:9|max:10',
    }
  }
}

module.exports = UpdateAuth
