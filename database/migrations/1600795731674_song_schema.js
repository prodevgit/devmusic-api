'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SongSchema extends Schema {
  up () {
    this.create('songs', (table) => {
      table.increments()
      table.string('name', 100).notNullable()
      table.string('artist', 100).notNullable()
      table.string('genre', 50).notNullable()
      table.integer('day').notNullable()
      table.integer('month').notNullable()
      table.integer('year').notNullable()
      table.string('album', 100).notNullable()
      table.string('uploaded_by', 100).notNullable()
      table.string('song_file',100).notNullable()
      table.string('song_art',100).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('songs')
  }
}

module.exports = SongSchema
