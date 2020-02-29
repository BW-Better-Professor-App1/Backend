exports.up = function (knex) {
    return knex.schema.createTable('Projects', tbl => {
        tbl.increments()

        tbl.string('Name', 255).notNullable()
        tbl.string('Deadline', 255) // NEED TO FIX DATE
        tbl.string('Notes', 255)

        tbl.integer('Student_Id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('Students')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');

        tbl.integer('Project_Category')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('Project-Categories')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
    })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('Projects')
};