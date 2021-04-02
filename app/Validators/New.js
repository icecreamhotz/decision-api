'use strict'

const BaseValidator = require('./BaseValidator')

class New extends BaseValidator {
  get rules () {
    if (this.ctx.request.method() === 'PUT') {
      return {
        name: 'required',
        description: 'required',
        delete_id: 'array'
      }
    }
    return {
      name: 'required',
      description: 'required',
      files: 'required|array|min:1'
    }
  }
}

module.exports = New
