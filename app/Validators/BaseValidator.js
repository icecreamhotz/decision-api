'use strict'

class BaseValidator {
  async fails(errorMessages) {
    return this.ctx.response.validateFailed(errorMessages)
  }

  get validateAll() {
    return true
  }
}

module.exports = BaseValidator
