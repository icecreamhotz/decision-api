'use strict'

const BaseValidator = require('./BaseValidator')

class ProblemDraft extends BaseValidator {
  get rules () {
    return {
      title: 'required',
      description: 'required'
    }
  }
}

module.exports = ProblemDraft
