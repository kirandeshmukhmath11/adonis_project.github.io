'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route')


Route.get('/', 'AuthController.index')
Route.post('/', 'AuthController.login')

Route.get('/register', 'RegisterController.index')
Route.post('register', 'RegisterController.doRegister')

Route.on('/home').render('main')
Route.on('/charts').render('charts')
Route.on('/total_figure').render('total_figure')
Route.on('/total_ch').render('total_ch')

Route.get('/mapsquares', function* (request, response) {
	const parent = 'map'
	yield response.sendView('squares', { parent })
})

Route.get('/chartsquares', function* (request, response) {
	const parent = 'chart'
	yield response.sendView('squares', { parent })
})


Route.get('/getdataforsimulation', 'AnomalyDetectorController.getDataForSimulation')
Route.get('/getdataforchart', 'AnomalyDetectorController.getDataForChart')

Route.get('/got', function* (request, response) {
	response.status(200).json({ user: 'prosper' })
}).middleware('auth')