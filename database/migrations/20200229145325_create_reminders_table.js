exports.up = function (knex) {
  return knex.schema.createTable('Reminders', tbl => {
    tbl.increments();

    tbl.string('name', 255).notNullable()
    tbl.string('description', 255)
    tbl.string('send_date').notNullable() // NEED DATE FIX

    tbl.integer('Professor_Id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('Professors')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  })
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('Reminders')
};