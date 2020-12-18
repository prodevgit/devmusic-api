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

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.post('/signup', 'UserController.signup')
Route.post('/login', 'UserController.login')
Route.post('/api/song/addsong','SongController.addSong').middleware(['auth:jwt'])
Route.post('/api/song/getsong','SongController.getSong').middleware(['auth:jwt'])
Route.get('/api/user/getuserplaylists','UserController.getUserPlaylists').middleware(['auth:jwt'])
Route.get('/api/playlist/createplaylist','PlaylistController.createPlaylist').middleware(['auth:jwt'])
Route.post('/api/playlist/addplaylistsong','PlaylistController.addPlaylistSong').middleware(['auth:jwt'])
Route.delete('/api/playlist/destroy/:id', 'PlaylistController.destroy').middleware(['auth:jwt'])