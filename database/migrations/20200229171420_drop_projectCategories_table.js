exports.up = function (knex) {
    return knex.schema.dropTableIfExists('Project-Categories');
};

exports.down = function (knex) {
    return knex.schema.createTable('Project-Categories', tbl => {
        tbl.increments()

        tbl.string('name', 255).notNullable().unique()

        tbl.integer('project_Id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('Professors')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
    })
};