'use strict'

const BaseValidator = require('./BaseValidator')

class Problem extends BaseValidator {
  get rules () {
    return {
      problem_category_id: 'required',
      title: 'required',
      // detail: ' required',
      description: 'required',
      child_true: 'array|max:1',
      child_false: 'array|max:1'
    }
  }
}

module.exports = Problem
