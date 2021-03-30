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
}

module.exports = AuthController
