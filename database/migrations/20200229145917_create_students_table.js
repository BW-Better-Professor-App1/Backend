exports.up = function (knex) {
  return knex.schema.createTable('Students', tbl => {
    tbl.increments()

    tbl.string('firstName', 255).notNullable()
    tbl.string('lastName', 255).notNullable()
    tbl.string('email', 255).notNullable().unique()

    tbl.integer('professor_Id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('Professors')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  })
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('Students')
};