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
const Helpers = use('Helpers')

const PREFIX_ROUTE_BOF = 'api/v1/manage'

Route.get('/', () => {
  return { greeting: 'Decision Project API' }
})

Route.get('/public/:path(.+)', async ({ params, response }) => {
  return response.download(Helpers.publicPath(params.path))
})

Route.group(() => {
  Route.post('/login', 'AuthController.login').validator('Auth')
  Route.get('/payload', 'AuthController.payload').middleware(['auth'])
  Route.post('/refresh-token', 'AuthController.refreshToken').middleware(['auth'])
  Route.put('/me', 'AuthController.update').middleware(['auth']).validator(['UpdateAuth'])
}).prefix(`${PREFIX_ROUTE_BOF}/auth`)

Route.group(() => {
  Route.get('', 'UserController.getLists')
  Route.get('/:id', 'UserController.getByID')
  Route.post('', 'UserController.store').validator(['User'])
  Route.put('/:id', 'UserController.update').validator(['User'])
  Route.delete('/:id', 'UserController.delete')
}).prefix(`${PREFIX_ROUTE_BOF}/users`).middleware(['auth'])

Route.group(() => {
  Route.get('', 'DocumentProblemController.getLists')
  Route.get('/:id', 'DocumentProblemController.getByID')
  Route.post('', 'DocumentProblemController.store').validator(['DocumentProblem'])
  Route.put('/:id', 'DocumentProblemController.update').validator(['DocumentProblem'])
  Route.delete('/:id', 'DocumentProblemController.delete')
}).prefix(`${PREFIX_ROUTE_BOF}/document-problems`).middleware(['auth'])

Route.group(() => {
  Route.get('', 'NewController.getLists')
  Route.get('/:id', 'NewController.getByID')
  Route.post('', 'NewController.store').validator(['New'])
  Route.put('/:id', 'NewController.update').validator(['New'])
  Route.delete('/:id', 'NewController.delete')
}).prefix(`${PREFIX_ROUTE_BOF}/news`).middleware(['auth'])

Route.group(() => {
  Route.get('', 'ProblemController.getLists')
  Route.get('/:id', 'ProblemController.getByID')
  Route.post('', 'ProblemController.store').validator(['Problem'])
  Route.put('/:id', 'ProblemController.update').validator(['Problem'])
  Route.delete('/:id', 'ProblemController.delete')
}).prefix(`${PREFIX_ROUTE_BOF}/problems`).middleware(['auth'])

Route.group(() => {
  Route.get('', 'ProblemChildController.getLists')
}).prefix(`${PREFIX_ROUTE_BOF}/problem-childs`).middleware(['auth'])

Route.get(`${PREFIX_ROUTE_BOF}/sidebar`, 'SidebarController.getSidebar').middleware(['auth'])

