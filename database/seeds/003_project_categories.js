exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('Project-Categories').del()
    .then(function () {
      // Inserts seed entries
      return knex('Project-Categories').insert([{
          Name: 'Letter of recommendation'
        },
        {
          Name: 'Referral'
        },
        {
          Name: 'Help / Advice / Mentorship'
        },
        {
          Name: "Other"
        }
      ]);
    });
};