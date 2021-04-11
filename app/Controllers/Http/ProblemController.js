'use strict'

const Database = use('Database')
const Problem = use('App/Models/Problem')
const ProblemChild = use('App/Models/ProblemChild')

class ProblemController {
  async getLists({
    response,
    request
  }) {
    const {
      page = 1, perPage = 10
    } = request.all()

    let problems
    try {
      problems = await Problem.query()
        .paginate(page, perPage)
    } catch(err) {
      console.error(err)
      return response.internalServerError()
    }

    return response.apiCollection(problems)
  }

  async getByID({
    response,
    params,
  }) {
    let problem
    try {
      problem = await Problem.query()
        .with('childs')
        .where('id', params.id)
        .first()
    } catch(err) {
      console.error(err)
      return response.internalServerError()
    }

    if(!problem) {
      return response.notFound()
    }

    return response.apiItem(problem)
  }
  
  async store({
    request,
    response
  }) {
    const {
      title,
      description,
      child_true = [],
      child_false = []
    } = request.only([
      'title',
      'description',
      'child_true',
      'child_false'
    ])

    const isHasChildTrue = child_true.length > 0
    const isHasChildFalse = child_false.length > 0

    if(isHasChildTrue) {
      let childTrueExists
      try {
        childTrueExists = await Problem.query()
          .whereIn('id', child_true)
          .fetch()
      } catch(err) {
        console.error(err)
        await trx.rollback()
        return response.internalServerError()
      }
      if(childTrueExists.toJSON().length < child_true.length) {
        return response.badRequest()
      }
    }

    if(isHasChildFalse) {
      let childFalseExists
      try {
        childFalseExists = await Problem.query()
          .whereIn('id', child_false)
          .fetch()
      } catch(err) {
        console.error(err)
        await trx.rollback()
        return response.internalServerError()
      }
      if(childFalseExists.toJSON().length < child_false.length) {
        return response.badRequest()
      }
    }

    let problem
    const trx = await Database.beginTransaction()
    try {
      problem = await Problem.create({
        title,
        description,
        view: 0
      }, trx)
      if(isHasChildTrue) {
        await ProblemChild.createMany(child_true.map(c => ({
          problem_id: problem.id,
          child_problem_id: c,
          is_true: true,
          is_false: false
        })), trx)
      }
      if(isHasChildFalse) {
        await ProblemChild.createMany(child_false.map(c => ({
          problem_id: problem.id,
          child_problem_id: c,
          is_true: false,
          is_false: true
        })), trx)
      }
      await trx.commit()
    } catch(err) {
      console.error(err)
      await trx.rollback()
      return response.internalServerError()
    }

    return response.apiCreated(problem)
  }

  async update({
    params,
    request,
    response
  }) {
    const { id } = params
    const {
      title,
      description,
      child_true = [],
      child_false = []
    } = request.only([
      'title',
      'description',
      'child_true',
      'child_false'
    ])

    const isHasChildTrue = child_true.length > 0
    const isHasChildFalse = child_false.length > 0

    let problem
    try {
      problem = await Problem.find(id)
    } catch(err) {
      console.error(err)
      return response.internalServerError()
    }

    if(!problem) {
      return response.notFound()
    }

    if(isHasChildTrue) {
      let childTrueExists
      try {
        childTrueExists = await Problem.query()
          .whereIn('id', child_true)
          .where('id', '!=', id)
          .fetch()
      } catch(err) {
        console.error(err)
        await trx.rollback()
        return response.internalServerError()
      }
      if(childTrueExists.toJSON().length < child_true.length) {
        return response.badRequest()
      }
    }

    if(isHasChildFalse) {
      let childFalseExists
      try {
        childFalseExists = await Problem.query()
          .whereIn('id', child_false)
          .where('id', '!=', id)
          .fetch()
      } catch(err) {
        console.error(err)
        await trx.rollback()
        return response.internalServerError()
      }
      if(childFalseExists.toJSON().length < child_false.length) {
        return response.badRequest()
      }
    }

    const trx = await Database.beginTransaction()
    try {
      problem.title = title
      problem.description = description
      await Promise.all([
        problem.save(trx),
        ProblemChild.query()
          .where('problem_id', id)
          .delete(trx)
      ])
      if(isHasChildTrue) {
        await ProblemChild.createMany(child_true.map(c => ({
          problem_id: problem.id,
          child_problem_id: c,
          is_true: true,
          is_false: false
        })), trx)
      }
      if(isHasChildFalse) {
        await ProblemChild.createMany(child_false.map(c => ({
          problem_id: problem.id,
          child_problem_id: c,
          is_true: false,
          is_false: true
        })), trx)
      }
      await trx.commit()
    } catch(err) {
      console.error(err)
      await trx.rollback()
      return response.internalServerError()
    }

    return response.apiCreated(problem)
  }

  async delete({
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
      await problem.delete()
    } catch(err) {
      console.error(err)
      return response.internalServerError()
    }

    return response.apiDeleted()
  }
}

module.exports = ProblemController
