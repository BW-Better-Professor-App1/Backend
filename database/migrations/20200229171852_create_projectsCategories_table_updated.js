exports.up = function (knex) {
    return knex.schema.createTable('Project-Categories', tbl => {
            tbl.increments()

            tbl.string('name', 255).notNullable().unique()
        })
        .then(async () => {
            await knex('Project-Categories').insert([{
                    name: 'Letter of recommendation'
                },
                {
                    name: 'Referral'
                },
                {
                    name: 'Help / Advice / Mentorship'
                },
                {
                    name: "Other"
                }
            ]);
        })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('Project-Categories')
};