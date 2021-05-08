'use strict'

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
}

module.exports = EventController
