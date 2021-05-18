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
const PREFIX_ROUTE_PUBLIC = 'api/v1/public'

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
}).prefix(`${PREFIX_ROUTE_BOF}/users`).middleware(['auth', 'can:ADMIN'])

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
  Route.get('', 'ProblemCategoryController.getLists')
  Route.get('/:id', 'ProblemCategoryController.getByID')
  Route.post('', 'ProblemCategoryController.store').validator(['ProblemCategory'])
  Route.put('/:id', 'ProblemCategoryController.update').validator(['ProblemCategory'])
  Route.delete('/:id', 'ProblemCategoryController.delete')
}).prefix(`${PREFIX_ROUTE_BOF}/problem-categories`).middleware(['auth'])

Route.group(() => {
  Route.get('', 'ProblemController.getLists')
  Route.get('/:id', 'ProblemController.getByID')
  Route.post('', 'ProblemController.store').validator(['Problem'])
  Route.post('/:id/__active_ishead', 'ProblemController.updateIsHead')
  Route.put('/:id', 'ProblemController.update').validator(['Problem'])
  Route.delete('/:id', 'ProblemController.delete')
}).prefix(`${PREFIX_ROUTE_BOF}/problems`).middleware(['auth'])

Route.group(() => {
  Route.get('', 'ProblemDraftController.getLists')
  Route.get('/:id', 'ProblemDraftController.getByID')
  Route.put('/:id', 'ProblemDraftController.update').validator(['ProblemDraft'])
  Route.delete('/:id', 'ProblemDraftController.delete')
}).prefix(`${PREFIX_ROUTE_BOF}/problem-drafts`).middleware(['auth'])

Route.group(() => {
  Route.get('', 'ProblemChildController.getLists')
}).prefix(`${PREFIX_ROUTE_BOF}/problem-childs`).middleware(['auth'])

Route.group(() => {
  Route.get('', 'EventController.getLists')
  Route.get('/:id', 'EventController.getByID')
  Route.post('', 'EventController.store')
  Route.put('/:id', 'EventController.update')
  Route.put('/:id/date', 'EventController.updateDate')
  Route.delete('/:id', 'EventController.delete')
}).prefix(`${PREFIX_ROUTE_BOF}/events`).middleware(['auth'])

Route.group(() => {
  Route.get('/system-score', 'ReportController.systemScore')
}).prefix(`${PREFIX_ROUTE_BOF}/reports`).middleware(['auth'])

Route.get(`${PREFIX_ROUTE_BOF}/sidebar`, 'SidebarController.getSidebar').middleware(['auth'])

// Public API
Route.group(() => {
  Route.get('', 'Frontend/NewController.getLists')
  Route.get('/:id', 'Frontend/NewController.getByID')
}).prefix(`${PREFIX_ROUTE_PUBLIC}/news`)

Route.group(() => {
  Route.get('', 'Frontend/ProblemController.getLists')
  Route.post('/:id/count-view', 'Frontend/ProblemController.countView')
  Route.post('/:id/vote', 'Frontend/ProblemController.vote').validator(['Vote'])
}).prefix(`${PREFIX_ROUTE_PUBLIC}/problems`)

Route.group(() => {
  Route.get('', 'Frontend/ProblemCategoryController.getLists')
}).prefix(`${PREFIX_ROUTE_PUBLIC}/problem-categories`)

Route.group(() => {
  Route.post('', 'Frontend/ProblemDraftController.store').validator(['ProblemDraftFront'])
}).prefix(`${PREFIX_ROUTE_PUBLIC}/problem-drafts`)

Route.group(() => {
  Route.get('', 'Frontend/EventController.getLists')
}).prefix(`${PREFIX_ROUTE_PUBLIC}/events`)

Route.group(() => {
  Route.get('/system-score', 'Frontend/ReportController.systemScore')
}).prefix(`${PREFIX_ROUTE_PUBLIC}/reports`)