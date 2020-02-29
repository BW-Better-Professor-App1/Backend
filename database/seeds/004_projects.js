exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('Projects').del()
    .then(function () {
      // Inserts seed entries
      return knex('Projects').insert([{
          Name: 'Write Declaration of Independence',
          Deadline: 'Some date',
          Notes: "This might be important.",
          Student_Id: 1,
          Project_Category: 3
        },
        {
          Name: 'Become president some day.',
          Deadline: 'Some date',
          Student_Id: 1,
          Project_Category: 1
        },
        {
          Name: 'Draft Virginia Statute for Religious Freedom',
          Notes: "FREEEEDOM!",
          Student_Id: 1,
          Project_Category: 3
        },
        {
          Name: 'Command the army during the American Revolution.',
          Deadline: 'Some date',
          Notes: "We can't lose!",
          Student_Id: 2,
          Project_Category: 3
        },
        {
          Name: 'Become president some day.',
          Deadline: 'Some date',
          Student_Id: 2,
          Project_Category: 1
        },
        {
          Name: 'Apply for a job at NASA.',
          Deadline: 'Some date',
          Student_Id: 3,
          Project_Category: 2
        }
      ]);
    });
};