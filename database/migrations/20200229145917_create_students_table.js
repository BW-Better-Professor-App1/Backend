
exports.up = function(knex) {
  return knex.schema.createTable('Students', tbl => {
      tbl.increments()

      tbl.string('FirstName', 255).notNullable()
      tbl.string('LastName', 255).notNullable()
      tbl.string('Email', 255).notNullable().unique()

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
  return knex.schema.dropTableIfExists('Students')
};
