exports.up = knex => {
  return knex.schema
    .createTable('titles', table => {
      table.increments('id').primary()
      table.text('localeTitle').notNullable().defaultTo('')
      table.text('localeCode').notNullable().defaultTo('')
      table.integer('pageID').notNullable().defaultTo(0)
    })
}

exports.down = knex => { }