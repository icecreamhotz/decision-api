'use strict'

const BaseValidator = require('./BaseValidator')

class Vote extends BaseValidator {
  get rules () {
    return {
      score_problem: 'required|integer|range:-1,6',
      score_system: 'required|integer|range:-1,6'
    }
  }
}

module.exports = Vote
