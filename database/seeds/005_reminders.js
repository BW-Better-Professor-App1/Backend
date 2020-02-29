exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('Reminders').del()
    .then(function () {
      // Inserts seed entries
      return knex('Reminders').insert([{
          Name: 'Give Billybob a referral.',
          Description: "Billybob is finished with school in the summer. He's applied for a job at NASA.",
          Professor_Id: 1,
          Send_Date: "some date here"
        },
        {
          Name: 'Recommend Thomas Jefferson for president.',
          Professor_Id: 1,
          Send_Date: "some date here"
        },
      ]);
    });
};