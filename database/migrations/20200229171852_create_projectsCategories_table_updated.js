exports.up = function (knex) {
    return knex.schema.createTable('Project-Categories', tbl => {
        tbl.increments()

        tbl.string('Name', 255).notNullable().unique()
    })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('Project-Categories')
};