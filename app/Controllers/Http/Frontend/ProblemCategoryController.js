'use strict'

const ProblemCategory = use('App/Models/ProblemCategory')

class ProblemCategoryController {
  async getLists({
    response
  }) {
    let problemCategories
    try {
      problemCategories = await ProblemCategory.all()
    } catch(err) {
      console.error(err)
      return response.internalServerError()
    }

    return response.apiCollection(problemCategories)
  }
}

module.exports = ProblemCategoryController
