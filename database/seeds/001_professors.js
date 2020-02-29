exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('Professors').del()
    .then(function () {
      // Inserts seed entries
      return knex('Professors').insert([{
        FirstName: 'John',
        LastName: 'Doe',
        Email: "test@email.com",
        Password: "HASHED.PASSWORD.HERE"
      }, ]);
    });
};