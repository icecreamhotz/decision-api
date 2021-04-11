'use strict'

const BaseValidator = require('./BaseValidator')

class Problem extends BaseValidator {
  get rules () {
    return {
      title: 'required',
      description: 'required',
      child_true: 'array',
      child_false: 'array',
    }
  }
}

module.exports = Problem
