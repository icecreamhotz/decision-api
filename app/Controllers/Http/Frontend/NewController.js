'use strict'

const New = use('App/Models/New')

class NewController {
  async getLists({
    response,
    request
  }) {
    const {
      page = 1, perPage = 10
    } = request.all()

    let newDatas
    try {
      newDatas = await New.query()
        .with('new_images')
        .paginate(page, perPage)
    } catch(err) {
      console.error(err)
      return response.internalServerError()
    }

    return response.apiCollection(newDatas)
  }

  async getByID({
    response,
    params,
  }) {
    let newData
    try {
      newData = await New.query()
        .with('new_images')
        .where('id', params.id)
        .first()
    } catch(err) {
      console.error(err)
      return response.internalServerError()
    }

    if(!newData) {
      return response.notFound()
    }

    return response.apiItem(newData)
  }
}

module.exports = NewController
