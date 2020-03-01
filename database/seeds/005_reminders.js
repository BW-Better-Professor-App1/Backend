exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('Reminders').del()
    .then(function () {
      // Inserts seed entries
      return knex('Reminders').insert([{
          name: 'Give Billybob a referral.',
          description: "Billybob is finished with school in the summer. He's applied for a job at NASA.",
          professor_Id: 1,
          send_date: "some date here"
        },
        {
          name: 'Recommend Thomas Jefferson for president.',
          professor_Id: 1,
          send_date: "some date here"
        },
      ]);
    });
};