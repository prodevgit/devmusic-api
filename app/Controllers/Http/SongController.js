'use strict'
const Song = use('App/Models/Song')
const Helpers = use('Helpers')

class SongController {

    async addSong ({ request, auth, response }) {
        // get user data from signup form
        const songData = request.only(['name', 'artist', 'genre', 'day' , 'month' , 'year' , 'album'])
        const songArt = request.file('song_art', {
            types: ['image'],
            size: '2mb'
          })
        const songFile = request.file('song_file', {
        types: ['audio']
        })
        var crypto = require("crypto");
        var id = crypto.randomBytes(20).toString('hex');
        await songArt.move(Helpers.tmpPath('uploads/arts'), {
            name: id+'.jpg',
            overwrite: true
          })
        if (!songArt.moved()) {
        return songArt.error()
        }     
        await songFile.move(Helpers.tmpPath('uploads/audios'), {
            name: id+'.mp3',
            overwrite: true
          })
        if (!songFile.moved()) {
        return songFile.error()
        } 
        songData['song_art']=id+".jpg"
        songData['song_file']=id+".mp3"
        songData['uploaded_by'] = auth.current.user.id
        try {
            // save user to database
            const song = await Song.create(songData)
            // generate JWT token for user

            return response.json({
                status: 'success',
                data: song
            })
        } catch (error) {
            console.log(error)
            return response.status(400).json({
                status: 'error',
                message: 'There was a problem creating the user, please try again later.'
            })
        }
    }

    async getSong({ request,  response }) {
        // get user data from signup form
        const songId = request.only(['id'])

        try {
            // save user to database
            const song = await Song.query()
                        .where('id', songId).firstOrFail()
            
            return response.json({
                status: 'success',
                data: song
            })
        } catch (error) {
            console.log(error)
            return response.status(400).json({
                status: 'error',
                message: 'There was a problem fetching the song, please try again later.'
            })
        }
    }
}

module.exports = SongController
