'use strict'

const Database = use('Database')
const moment = use('moment')
const Drive = use('Drive')
const Helpers = use('Helpers')
const New = use('App/Models/New')
const NewImage = use('App/Models/NewImage')

class UserController {
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

  async store({
    request,
    response
  }) {
    const files = request.file('files', {
      types: ['image'],
      extnames: ['jpg', 'jpeg', 'png', 'gif']
    })
    const {
      name,
      description
    } = request.only([
      'name',
      'description'
    ])

    const trx = await Database.beginTransaction()
    let newData
    try {
      let imageName = []
      await files.moveAll(Helpers.publicPath(), (file, i) => {
        const filename = `${moment().format('YYYYMMDDHHmmss')}${i}.${file.subtype}`
        imageName.push(filename)
        return {
          name: filename
        }
      })
    
      if (!files.movedAll()) {
        return files.errors()
      }

      newData = await New.create({
        name,
        description
      }, trx)
      await NewImage.createMany(imageName.map(v => ({
        new_id: newData.id,
        name: v
      })), trx)
      await trx.commit()
    } catch(err) {
      console.error(err)
      await trx.rollback()
      return response.internalServerError()
    }

    return response.apiCreated(newData)
  }

  async update({
    params,
    request,
    response
  }) {
    const {
      id
    } = params
    const files = request.file('files', {
      types: ['image'],
      extnames: ['jpg', 'jpeg', 'png', 'gif']
    })
    const {
      name,
      description,
      delete_id = []
    } = request.only([
      'name',
      'description',
      'delete_id'
    ])

    let newData
    try {
      newData = await New.find(id)
    } catch(err) {
      console.error(err)
      return response.internalServerError()
    }

    if(!newData) {
      return response.notFound()
    }

    const trx = await Database.beginTransaction()
    try {
      let imageName = []
      if(files) {
        await files.moveAll(Helpers.publicPath(), (file, i) => {
          const filename = `${moment().format('YYYYMMDDHHmmss')}${i}.${file.subtype}`
          imageName.push(filename)
          return {
            name: filename
          }
        })
      
        if (!files.movedAll()) {
          return files.errors()
        }
      }

      if(delete_id.length > 0) {
        const newImages = await NewImage.query()
        .where('new_id', id)
        .whereIn('id', delete_id)
        .fetch()
        const newImagesJSON = newImages.toJSON()
        for(let i = 0; i < newImagesJSON.length; i += 1) {
          await Drive.delete(Helpers.publicPath(newImagesJSON[i].name))
        }
        await NewImage.query()
          .where('new_id', newData.id)
          .whereIn('id', delete_id)
          .delete(trx)
      }

      newData.name = name
      newData.description = description
      if(imageName.length > 0) {
        await NewImage.createMany(imageName.map(v => ({
          new_id: newData.id,
          name: v
        })), trx)
      }
      await trx.commit()
    } catch(err) {
      console.error(err)
      await trx.rollback()
      return response.internalServerError()
    }

    return response.apiUpdated(newData)
  }

  async delete({
    params,
    response
  }) {
    let newData
    try {
      newData = await New.find(params.id)
    } catch(err) {
      console.error(err)
      return response.internalServerError()
    }

    if(!newData) {
      return response.notFound()
    }

    try {
      await newData.delete()
    } catch(err) {
      console.error(err)
      return response.internalServerError()
    }

    return response.apiDeleted()
  }
}

module.exports = UserController
