'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PlaylistSongSchema extends Schema {
  up () {
    this.create('playlist_songs', (table) => {
      table.increments()
      table.integer('playlist_id').notNullable()
      table.integer('song_id').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('playlist_songs')
  }
}

module.exports = PlaylistSongSchema
