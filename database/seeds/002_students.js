exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('Students').del()
    .then(function () {
      // Inserts seed entries
      return knex('Students').insert([{
          firstName: 'Thomas',
          lastName: 'Jefferson',
          email: "thomas.j@email.com",
          professor_Id: 1
        },
        {
          firstName: 'George',
          lastName: 'Washington',
          email: "firstpres@email.com",
          professor_Id: 1
        },
        {
          firstName: 'Billy',
          lastName: 'Bob',
          email: "i.like.trains@email.com",
          professor_Id: 1
        }
      ]);
    });
};