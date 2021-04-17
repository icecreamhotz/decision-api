'use strict'

const BaseValidator = require('./BaseValidator')

class ProblemDraftFront extends BaseValidator {
  get rules () {
    return {
      title: 'required',
    }
  }
}

module.exports = ProblemDraftFront
