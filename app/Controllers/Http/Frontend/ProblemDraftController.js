'use strict'

const ProblemDraft = use('App/Models/ProblemDraft')

class ProblemDraftController {
  async store({
    request,
    response
  }) {
    const {
      title
    } = request.only([
      'title'
    ])

    let problemDraft
    try {
      problemDraft = await ProblemDraft.create({
        title
      })
    } catch(err) {
      console.error(err)
      return response.internalServerError()
    }

    return response.apiCreated(problemDraft)
  }
}

module.exports = ProblemDraftController
