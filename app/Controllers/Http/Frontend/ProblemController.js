'use strict'

const moment = use('moment')
const Database = use('Database')
const Problem = use('App/Models/Problem')
const ProblemScoreLog = use('App/Models/ProblemScoreLog')
const SystemScore = use('App/Models/SystemScore')

class ProblemController {
  async getLists({
    response,
    request
  }) {
    const {
      title = '',
      problem_id = '',
      sortBy = 'asc',
      problem_category_id = ''
    } = request.all()
    
    let problems
    try {
      problems = await Problem.query()
        .with('childs')
        .search({
          title
        })
        .filter({
          id: problem_id,
          is_head: problem_id ? undefined : true
        })
        .where('problem_category_id', problem_category_id)
        .orderBy('score', sortBy)
        .fetch()
    } catch(err) {
      console.error(err)
      return response.internalServerError()
    }

    return response.apiCollection(problems)
  }

  async countView({
    params,
    response
  }) {
    let problem
    try {
      problem = await Problem.find(params.id)
    } catch(err) {
      console.error(err)
      return response.internalServerError()
    }

    if(!problem) {
      return response.notFound()
    }

    try {
      problem.view = problem.view + 1
      await problem.save()
    } catch(err) {
      console.error(err)
      return response.internalServerError()
    }

    return response.apiUpdated(problem)
  }

  async vote({
    params,
    request,
    response,
  }) {
    const { id } = params
    const {
      score_problem,
      score_system
    } = request.only([
      'score_problem',
      'score_system'
    ])

    let problem
    try {
      problem = await Problem.find(params.id)
    } catch(err) {
      console.error(err)
      return response.internalServerError()
    }

    if(!problem) {
      return response.notFound()
    }

    const trx = await Database.beginTransaction()
    try {
      problem.score = problem.score + score_problem
      await Promise.all([
        problem.save(trx),
        ProblemScoreLog.create({
          date: new Date(moment().format('YYYY-MM-DDT00:00:00.00Z')),
          problem_id: id,
          score: score_problem
        }, trx),
        SystemScore.create({
          date: new Date(moment().format('YYYY-MM-DDT00:00:00.00Z')),
          score: score_system
        }, trx)
      ])
      await trx.commit()
    } catch(err) {
      console.error(err)
      await trx.rollback()
      return response.internalServerError()
    }

    return response.apiUpdated(problem)
  }
}

module.exports = ProblemController
