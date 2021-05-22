'use strict'

const moment = use('moment')
const SystemScore = use('App/Models/SystemScore')

class ReportController {
  async systemScore({
    request,
    response
  }) {
    const {
     year = ''
    } = request.get()

    let scores
    try {
      if(year) {
        scores = await SystemScore.query()
          .where('date', '>=', new Date(moment(`${year}-01-01T00:00:00`)))
          .where('date', '<=', new Date(moment(`${year}-12-31T23:59:59`)))
          .fetch()
      } else {
        scores = await SystemScore.all()
      }
    } catch (error) {
      console.log(error)
      return response.internalServerError()
    }

    return response.apiItem(scores)
  }
}

module.exports = ReportController
