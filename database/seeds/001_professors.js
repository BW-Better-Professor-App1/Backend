exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('Professors').del()
    .then(function () {
      // Inserts seed entries
      return knex('Professors').insert([{
        FirstName: 'John',
        LastName: 'Doe',
        Email: "test@email.com",
        Password: "$2a$10$/.0vo89bh8JtJrIj2znQ7Om4Se8el7zGWLT3LAiwproMgO7MBuHfy"
      }, ]);
    });
};