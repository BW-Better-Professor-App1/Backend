exports.up = function (knex) {
  return knex.schema.createTable('Professors', tbl => {
    tbl.increments();

    tbl.string('firstName', 255).notNullable()
    tbl.string('lastName', 255).notNullable()
    tbl.string('email', 255).notNullable().unique()
    tbl.string('password', 255).notNullable()
  })
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('Professors');
};