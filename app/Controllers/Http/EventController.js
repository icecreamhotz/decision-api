'use strict'

const moment = use('moment')
const Event = use('App/Models/Event')

class EventController {
  async getLists({
    response
  }) {

    let events
    try {
      events = await Event.all()
    } catch(err) {
      console.error(err)
      return response.internalServerError()
    }

    return response.apiCollection(events)
  }

  async getByID({
    response,
    params,
  }) {
    let event
    try {
      event = await Event.find(params.id)
    } catch(err) {
      console.error(err)
      return response.internalServerError()
    }

    if(!event) {
      return response.notFound()
    }

    return response.apiItem(event)
  }

  async store({
    request,
    response
  }) {
    const {
      start,
      end,
      title,
      description
    } = request.only([
      'start',
      'end',
      'title',
      'description'
    ])

    let event
    try {
      event = await Event.create({
        start: new Date(moment(start).format('YYYY-MM-DDTHH:mm:ss.00Z')),
        end: new Date(moment(end).format('YYYY-MM-DDTHH:mm:ss.00Z')),
        title,
        description
      })
    } catch (error) {
      console.log(error)
      return response.internalServerError()
    }

    return response.apiCreated(event)
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
      start,
      end,
      title,
      description
    } = request.only([
      'start',
      'end',
      'title',
      'description'
    ])

    let event
    try {
      event = await Event.find(id)
    } catch(err) {
      console.error(err)
      return response.internalServerError()
    }

    if(!event) {
      return response.notFound()
    }
    
    try {
      event.start = new Date(moment(start).format('YYYY-MM-DDTHH:mm:ss.00Z'))
      event.end = new Date(moment(end).format('YYYY-MM-DDTHH:mm:ss.00Z'))
      event.title = title
      event.description = description
      await event.save()
    } catch (error) {
      console.log(error)
      return response.internalServerError()
    }

    return response.apiUpdated(event)
  }

  async updateDate({
    params,
    request,
    response
  }) {
    const {
      id
    } = params
    const {
      start,
      end
    } = request.only([
      'start',
      'end'
    ])

    let event
    try {
      event = await Event.find(id)
    } catch(err) {
      console.error(err)
      return response.internalServerError()
    }

    if(!event) {
      return response.notFound()
    }
    
    try {
      event.start = new Date(moment(start).format('YYYY-MM-DDTHH:mm:ss.00Z'))
      event.end = new Date(moment(end).format('YYYY-MM-DDTHH:mm:ss.00Z'))
      await event.save()
    } catch (error) {
      console.log(error)
      return response.internalServerError()
    }

    return response.apiUpdated(event)
  }

  async delete({
    params,
    response
  }) {
    let event
    try {
      event = await Event.find(params.id)
    } catch(err) {
      console.error(err)
      return response.internalServerError()
    }

    if(!event) {
      return response.notFound()
    }

    try {
      await event.delete()
    } catch(err) {
      console.error(err)
      return response.internalServerError()
    }

    return response.apiDeleted()
  }
}

module.exports = EventController
