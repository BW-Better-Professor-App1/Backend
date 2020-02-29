exports.up = function (knex) {
    return knex.schema.createTable('Projects', tbl => {
        tbl.increments()

        tbl.string('Name', 255).notNullable()
        tbl.string('Deadline', 255)
        tbl.string('Notes', 255)

        tbl.integer('Student_Id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('Professors')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');

        tbl.integer('Project_Category')
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