'use strict'

const SystemScore = use('App/Models/SystemScore')

class ReportController {
  async systemScore({
    response
  }) {
    let scores
    try {
      scores = await SystemScore.all()
    } catch (error) {
      console.log(error)
      return response.internalServerError()
    }

    return response.apiItem(scores)
  }
}

module.exports = ReportController
