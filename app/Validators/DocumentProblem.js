'use strict'

const BaseValidator = require('./BaseValidator')

class DocumentProblem extends BaseValidator {
  get rules () {
    if (this.ctx.request.method() === 'PUT') {
      return {
        name: 'required'
      }
    }
    return {
      name: 'required',
      file: 'file|file_size:10mb'
    }
  }
}

module.exports = DocumentProblem
