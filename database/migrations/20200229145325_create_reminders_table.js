
exports.up = function(knex) {
  return knex.schema.createTable('Reminders', tbl => {
      tbl.increments();

      tbl.string('Name', 255).notNullable()
      tbl.string('Description', 255).notNullable()
      tbl.datetime('Send_Date').notNullable()

      tbl.integer('Professor_Id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('Professors')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('Reminders')
};
