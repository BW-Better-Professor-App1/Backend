exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('Students').del()
    .then(function () {
      // Inserts seed entries
      return knex('Students').insert([{
          FirstName: 'Thomas',
          LastName: 'Jefferson',
          Email: "thomas.j@email.com",
          Professor_Id: 1
        },
        {
          FirstName: 'George',
          LastName: 'Washington',
          Email: "firstpres@email.com",
          Professor_Id: 1
        },
        {
          FirstName: 'Billy',
          LastName: 'Bob',
          Email: "i.like.trains@email.com",
          Professor_Id: 1
        }
      ]);
    });
};