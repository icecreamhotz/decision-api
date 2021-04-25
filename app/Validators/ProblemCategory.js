'use strict'

const BaseValidator = require('./BaseValidator')

class ProblemCategory extends BaseValidator {
  get rules () {
    return {
      name: 'required'
    }
  }
}

module.exports = ProblemCategory
