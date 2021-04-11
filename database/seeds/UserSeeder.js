'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

const User = use('App/Models/User')

class UserSeeder {
  async run () {
    await User.create({
      username: 'admin',
      password: 'admin@test',
      email: 'admin@admin.com',
      firstname: 'Super',
      lastname: 'Admin',
      tel: '-',
      role: 'ADMIN'
    })
  }
}

module.exports = UserSeeder
