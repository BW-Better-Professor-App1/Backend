
exports.up = function(knex) {
  return knex.schema.createTable('Project-Categories', tbl => {
      tbl.increments()

      tbl.string('Name', 255).notNullable().unique()

      tbl.integer('Project_Id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('Professors')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('Project-Categories')
};
