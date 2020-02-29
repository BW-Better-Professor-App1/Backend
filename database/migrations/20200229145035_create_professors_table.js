
exports.up = function(knex) {
  return knex.schema.createTable('Professors', tbl => {
      tbl.increments();

      tbl.string('FirstName', 255).notNullable()
      tbl.string('LastName', 255).notNullable()
      tbl.string('Email', 255).notNullable().unique()
      tbl.string('Password', 255).notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('Professors');
};
