'use strict'

const User = use('App/Models/User')

class UserController {
  async getLists({
    response,
    request,
    auth
  }) {
    const {
      page = 1, perPage = 10
    } = request.all()

    let users
    try {
      users = await User.query()
        .where('id', '!=', auth.user.id)
        .paginate(page, perPage)
    } catch(err) {
      console.error(err)
      return response.internalServerError()
    }

    return response.apiCollection(users)
  }

  async getByID({
    response,
    params,
  }) {
    let user
    try {
      user = await User.find(params.id)
    } catch(err) {
      console.error(err)
      return response.internalServerError()
    }

    if(!user) {
      return response.notFound()
    }

    return response.apiItem(user)
  }

  async store({
    request,
    response
  }) {
    const {
      username,
      password,
      email,
      firstname,
      lastname,
      tel,
      role
    } = request.only([
      'username',
      'password',
      'email',
      'firstname',
      'lastname',
      'tel',
      'role'
    ])

    let user
    try {
      user = await User.query()
        .where('username', username)
        .first()
    } catch(err) {
      console.error(err)
      return response.internalServerError()
    }

    if(user) {
      return response.badRequest({
        ERROR_TYPE: 'UNIQUE_USERNAME'
      })
    }

    try {
      user = await User.create({
        username,
        password,
        email,
        firstname,
        lastname,
        tel,
        role
      }) 
    } catch(err) {
      console.error(err)
      return response.internalServerError()
    }

    return response.apiCreated(user)
  }

  async update({
    params,
    request,
    response,
    auth
  }) {
    const {
      email,
      firstname,
      lastname,
      tel,
      role
    } = request.only([
      'email',
      'firstname',
      'lastname',
      'tel',
      'role'
    ])

    let user
    try {
      user = await User.find(params.id)
    } catch(err) {
      console.error(err)
      return response.internalServerError()
    }

    if(!user) {
      return response.notFound()
    }

    if(+user.id === +auth.user.id) {
      return response.badRequest()
    }

    try {
      user.email = email
      user.firstname = firstname
      user.lastname = lastname
      user.tel = tel
      user.role = role
      await user.save()
    } catch(err) {
      console.error(err)
      return response.internalServerError()
    }

    return response.apiUpdated(user)
  }

  async delete({
    params,
    response,
    auth
  }) {
    let user
    try {
      user = await User.find(params.id)
    } catch(err) {
      console.error(err)
      return response.internalServerError()
    }

    if(!user) {
      return response.notFound()
    }

    if(+user.id === +auth.user.id) {
      return response.badRequest()
    }

    try {
      await user.delete()
    } catch(err) {
      console.error(err)
      return response.internalServerError()
    }

    return response.apiDeleted()
  }
}

module.exports = UserController
