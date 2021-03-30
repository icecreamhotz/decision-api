'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

const PREFIX_ROUTE_BOF = 'api/v1/manage'

Route.get('/', () => {
  return { greeting: 'Decision Project API' }
})

Route.group(() => {
  Route.post('login', 'AuthController.login').validator('Auth')
  Route.get('payload', 'AuthController.payload').middleware(['auth'])
}).prefix(`${PREFIX_ROUTE_BOF}/auth`)

Route.group(() => {
  Route.get('', 'UserController.getLists')
  Route.get('/:id', 'UserController.getByID')
  Route.post('', 'UserController.store').validator(['User'])
  Route.put('/:id', 'UserController.update').validator(['User'])
  Route.delete('/:id', 'UserController.delete')
}).prefix(`${PREFIX_ROUTE_BOF}/users`).middleware(['auth'])

