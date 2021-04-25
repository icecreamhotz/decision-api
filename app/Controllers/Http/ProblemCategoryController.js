'use strict'

const ProblemCategory = use('App/Models/ProblemCategory')
const Problem = use('App/Models/Problem')

class ProblemCategoryController {
  async getLists({
    response,
    request
  }) {
    const {
      page = 1, perPage = 10
    } = request.all()

    let problemCategories
    try {
      problemCategories = await ProblemCategory.query()
        .paginate(page, perPage)
    } catch(err) {
      console.error(err)
      return response.internalServerError()
    }

    return response.apiCollection(problemCategories)
  }

  async getByID({
    response,
    params,
  }) {
    let problemCategory
    try {
      problemCategory = await ProblemCategory.find(params.id)
    } catch(err) {
      console.error(err)
      return response.internalServerError()
    }

    if(!problemCategory) {
      return response.notFound()
    }

    return response.apiItem(problemCategory)
  }

  async store({
    request,
    response
  }) {
    const {
      name
    } = request.only([
      'name'
    ])

    let problemCategory
    try {
      problemCategory = await ProblemCategory.create({
        name
      })
    } catch(err) {
      console.error(err)
      return response.internalServerError()
    }

    return response.apiCreated(problemCategory)
  }

  async update({
    params,
    request,
    response
  }) {
    const {
      id
    } = params
    const {
      name
    } = request.only([
      'name'
    ])

    let problemCategory
    try {
      problemCategory = await ProblemCategory.find(id)
    } catch(err) {
      console.error(err)
      return response.internalServerError()
    }

    if(!problemCategory) {
      return response.notFound()
    }

    try {
      problemCategory.name = name
      await problemCategory.save()
    } catch(err) {
      console.error(err)
      return response.internalServerError()
    }

    return response.apiUpdated(problemCategory)
  }

  async delete({
    params,
    response
  }) {
    const {
      id
    } = params

    try {
      const problem = await Problem.query()
        .where('problem_category_id', id)
        .first()
      if(problem) {
        return response.badRequest()
      }
    } catch(err) {
      console.error(err)
      return response.internalServerError()
    }

    let problemCategory
    try {
      problemCategory = await ProblemCategory.find(id)
    } catch(err) {
      console.error(err)
      return response.internalServerError()
    }

    if(!problemCategory) {
      return response.notFound()
    }

    try {
      await problemCategory.delete()
    } catch(err) {
      console.error(err)
      return response.internalServerError()
    }

    return response.apiDeleted()
  }
}

module.exports = ProblemCategoryController
