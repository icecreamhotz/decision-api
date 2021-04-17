'use strict'

const Database = use('Database')
const Problem = use('App/Models/Problem')
const ProblemDraft = use('App/Models/ProblemDraft')

class ProblemDraftController {
  async getLists({
    response,
    request
  }) {
    const {
      page = 1, perPage = 10
    } = request.all()

    let problemDrafts
    try {
      problemDrafts = await ProblemDraft.query()
        .paginate(page, perPage)
    } catch(err) {
      console.error(err)
      return response.internalServerError()
    }

    return response.apiCollection(problemDrafts)
  }

  async getByID({
    response,
    params,
  }) {
    let problemDraft
    try {
      problemDraft = await ProblemDraft.query()
        .where('id', params.id)
        .first()
    } catch(err) {
      console.error(err)
      return response.internalServerError()
    }

    if(!problemDraft) {
      return response.notFound()
    }

    return response.apiItem(problemDraft)
  }
  
  async update({
    params,
    request,
    response
  }) {
    const { id } = params
    const {
      title,
      description
    } = request.only([
      'title',
      'description'
    ])

    let problemDraft
    try {
      problemDraft = await ProblemDraft.find(id)
    } catch(err) {
      console.error(err)
      return response.internalServerError()
    }

    if(!problemDraft) {
      return response.notFound()
    }

    let problem
    const trx = await Database.beginTransaction()
    try {
      const [
        problemRequest
      ] = await Promise.all([
        Problem.create({
          title,
          description,
          view: 0,
          is_head: false,
          score: 0
        }, trx),
        problemDraft.delete(trx)
      ])
      problem = problemRequest
      await trx.commit()
    } catch(err) {
      console.error(err)
      await trx.rollback()
      return response.internalServerError()
    }

    return response.apiUpdated(problem)
  }

  async delete({
    params,
    response
  }) {
    let problemDraft
    try {
      problemDraft = await ProblemDraft.find(params.id)
    } catch(err) {
      console.error(err)
      return response.internalServerError()
    }

    if(!problemDraft) {
      return response.notFound()
    }

    try {
      await problemDraft.delete()
    } catch(err) {
      console.error(err)
      return response.internalServerError()
    }

    return response.apiDeleted()
  }
}

module.exports = ProblemDraftController
