'use strict'

const Playlist = use('App/Models/Playlist')
const PlaylistSong = use('App/Models/PlaylistSong')

class PlaylistController {


    async createPlaylist ({ request, auth, response }) {
        // get user data from signup form
        let playlistData = request.only(['name'])
        playlistData['userid'] = auth.current.user.id
        playlistData['followers'] = 0
        console.log(playlistData)
        try {
            // save user to database
            const playlist = await Playlist.create(playlistData)
            // generate JWT token for user
            

            return response.json({
                status: 'success',
                data: playlist
            })
        } catch (error) {
            console.log(error)
            return response.status(400).json({
                status: 'error',
                message: 'There was a problem creating the user, please try again later.'
            })
        }
    }

    async getPlaylistSongs({ request,  response }) {
        // get user data from signup form
        const playlistId = request.only(['playlistid'])

        try {
            // save user to database
            const songs = await PlaylistSong.query()
                        .where('playlist_id', playlistId).fetch()
            
            return response.json({
                status: 'success',
                data: songs
            })
        } catch (error) {
            console.log(error)
            return response.status(400).json({
                status: 'error',
                message: 'There was a problem fetching the song, please try again later.'
            })
        }
    }

    async addPlaylistSong({ request,  response }) {
        // get user data from signup form
        const playlistData = request.only(['playlist_id','song_id'])

        try {
            // save user to database
            const playlistSong = await PlaylistSong.create(playlistData)
            
            return response.json({
                status: 'success',
                data: playlistSong
            })
        } catch (error) {
            console.log(error)
            return response.status(400).json({
                status: 'error',
                message: 'There was a problem fetching the song, please try again later.'
            })
        }
    }

    async destroy ({ request, auth, params, response }) {
        // get currently authenticated user
        const user = auth.current.user
    
        // get tweet with the specified ID
        const playlist = await Playlist.query()
            .where('userid', user.id)
            .where('id', params.id)
            .firstOrFail()
        const playlistsongs = await PlaylistSong.query()
        .where('playlist_id', params.id)
        .fetch()
    
        await playlist.delete()
        await playlistsongs.delete()
    
        return response.json({
            status: 'success',
            message: 'Playlist deleted!',
            data: null
        })
    }
    
}

module.exports = PlaylistController
