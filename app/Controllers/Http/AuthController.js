'use strict'

const User = use('App/Models/User')

class AuthController {
  async login({ auth, request, response }) {
    let data = null
    const {
      username,
      password
    } = request.only(['username', 'password'])
    
    try {
      await auth.attempt(username, password)
      const user = await User.query()
        .where('username', username)
        .first()  
      data = await auth.generate(user)
    } catch (err) {
      console.error(err)
      return response.unauthorized()
    }
    return response.apiSuccess('Login successfully', data)
  }

  async payload({ response, auth }) {
    const user_id = auth.user.id

    let user
    try {
      user = await User.find(user_id)
    } catch (err) {
      console.error(err)
      return response.internalServerError()
    }
    return response.apiItem(user)
  }

  async update({
    request,
    response,
    auth
  }) {
    const {
      password = '',
      email,
      firstname,
      lastname,
      tel
    } = request.only([
      'password',
      'email',
      'firstname',
      'lastname',
      'tel'
    ])

    let user
    try {
      user = await User.find(auth.user.id)
    } catch(err) {
      console.error(err)
      return response.internalServerError()
    }

    try {
      if(password) {
        user.password = password
      }
      user.email = email
      user.firstname = firstname
      user.lastname = lastname
      user.tel = tel
      await user.save()
    } catch(err) {
      console.error(err)
      return response.internalServerError()
    }

    return response.apiUpdated(user)
  }

  async refreshToken ({ response, auth }) {
    const user_id = auth.user.id

    let user
    try {
      user = await User.find(user_id)
    } catch(err) {
      console.error(err)
      return response.unauthorized()
    }

    let data
    try {
      data = await auth
        .generate(user, {
          id: user.id,
          name: user.name
        })
    } catch (err) {
      console.error(err)
      return response.unauthorized()
    }

    return response.apiSuccess('Refresh token Success', data)
  }
}

module.exports = AuthController
