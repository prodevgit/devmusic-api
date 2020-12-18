'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class PlaylistSong extends Model {
    playlist () {
        return this.belongsTo('App/Models/Playlist')
    }
}

module.exports = PlaylistSong
