exports.up = function (knex) {
  return knex.schema.createTable('Projects', tbl => {
    tbl.increments()

    tbl.string('name', 255).notNullable()
    tbl.string('deadline', 255)
    tbl.string('notes', 255)

    tbl.integer('student_Id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('Professors')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

  })
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('Projects')
};