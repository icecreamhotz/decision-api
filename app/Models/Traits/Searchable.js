'use strict'

const moment = require('moment')

class Searchable {
  register (Model) {
    Model.queryMacro('search', function (fields = {}) {
      this.where(function () {
        Object.keys(fields).forEach((key) => {
          if (fields[key] !== null && fields[key] !== undefined && fields[key] !== '') {
            this.orWhere(key, 'LIKE', `%${fields[key]}%`)
          }
        })
      })
      return this
    })

    Model.queryMacro('filter', function (fields = {}) {
      this.where(function () {
        Object.keys(fields).forEach((key) => {
          if (fields[key] !== null && fields[key] !== undefined && fields[key] !== '') {
            this.where(key, fields[key])
          }
        })
      })
      return this
    })

    Model.queryMacro('dateRange', function (start = {}, end = {}) {
      if (start !== {}) {
        this.where(function () {
          Object.keys(start).forEach((key) => {
            if (start[key] !== null && start[key] !== undefined && start[key] !== '') {
              this.where(key, '>=', new Date(`${moment(start[key]).format('YYYY-MM-DD')}T00:00:00`))
            }
          })
        })
      }
      if (end !== {}) {
        this.where(function () {
          Object.keys(end).forEach((key) => {
            if (end[key] !== null && end[key] !== undefined && end[key] !== '') {
              this.where(key, '<=', new Date(`${moment(end[key]).format('YYYY-MM-DD')}T23:59:59`))
            }
          })
        })
      }
      return this
    })
  }
}

module.exports = Searchable
