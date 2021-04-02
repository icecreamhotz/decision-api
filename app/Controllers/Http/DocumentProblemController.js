'use strict'

const moment = use('moment')
const Drive = use('Drive')
const Helpers = use('Helpers')
const DocumentProblem = use('App/Models/DocumentProblem')

class UserController {
  async getLists({
    response,
    request
  }) {
    const {
      page = 1, perPage = 10
    } = request.all()

    let documentProblems
    try {
      documentProblems = await DocumentProblem.query()
        .paginate(page, perPage)
    } catch(err) {
      console.error(err)
      return response.internalServerError()
    }

    return response.apiCollection(documentProblems)
  }

  async getByID({
    response,
    params,
  }) {
    let documentProblem
    try {
      documentProblem = await DocumentProblem.find(params.id)
    } catch(err) {
      console.error(err)
      return response.internalServerError()
    }

    if(!documentProblem) {
      return response.notFound()
    }

    return response.apiItem(documentProblem)
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

    let documentProblem
    try {
      const file = request.file('file')
      const filename = `${moment().format('YYYYMMDDHHmmss')}.${file.subtype}`
      await file.move(Helpers.publicPath(), {
        name: filename,
        overwrite: true
      })
      if (!file.moved()) {
        throw file.error()
      }
      documentProblem = await DocumentProblem.create({
        name,
        file: filename
      })
    } catch(err) {
      console.error(err)
      return response.internalServerError()
    }

    return response.apiCreated(documentProblem)
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

    let documentProblem
    try {
      documentProblem = await DocumentProblem.find(id)
    } catch(err) {
      console.error(err)
      return response.internalServerError()
    }

    if(!documentProblem) {
      return response.notFound()
    }

    try {
      let filename = documentProblem.file
      if(request.file('file')) {
        const file = request.file('file')
        filename = `${moment().format('YYYYMMDDHHmmss')}.${file.subtype}`
        await file.move(Helpers.publicPath(), {
          name: filename,
          overwrite: true
        })
        if (!file.moved()) {
          throw file.error()
        }
        await Drive.delete(Helpers.publicPath(documentProblem.file))
      }
      documentProblem.name = name
      documentProblem.file = filename
      await documentProblem.save()
    } catch(err) {
      console.error(err)
      return response.internalServerError()
    }

    return response.apiUpdated(documentProblem)
  }

  async delete({
    params,
    response
  }) {
    let documentProblem
    try {
      documentProblem = await DocumentProblem.find(params.id)
    } catch(err) {
      console.error(err)
      return response.internalServerError()
    }

    if(!documentProblem) {
      return response.notFound()
    }

    try {
      await documentProblem.delete()
    } catch(err) {
      console.error(err)
      return response.internalServerError()
    }

    return response.apiDeleted()
  }
}

module.exports = UserController
