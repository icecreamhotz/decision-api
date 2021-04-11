'use strict'

const User = use('App/Models/User')

const { MENU } = require('../../../static/constants/user');

class SidebarController {
  async getSidebar({
    response,
    auth
  }) {
    const user_id = auth.user.id

    let user
    try {
      user = await User.find(user_id)
    } catch(err) {
      console.error(err)
      return response.unauthorized()
    }

    const menus = MENU.filter((menu) => {
      return menu.roles.some(m => user.role.includes(m))
    })

    return response.apiItem(menus)
  }
}

module.exports = SidebarController