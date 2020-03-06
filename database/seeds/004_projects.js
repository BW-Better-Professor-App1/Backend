exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('Projects').del()
    .then(function () {
      // Inserts seed entries
      return knex('Projects').insert([{
          name: 'Write Declaration of Independence',
          deadline: 'Some date',
          notes: "This might be important.",
          student_Id: 1,
          project_category: 3
        },
        {
          name: 'Become president some day.',
          deadline: 'Some date',
          student_Id: 1,
          project_category: 1
        },
        {
          name: 'Draft Virginia Statute for Religious Freedom',
          notes: "FREEEEDOM!",
          student_Id: 1,
          project_category: 3
        },
        {
          name: 'Command the army during the American Revolution.',
          deadline: 'Some date',
          notes: "We can't lose!",
          student_Id: 2,
          project_category: 3
        },
        {
          name: 'Become president some day.',
          deadline: 'Some date',
          student_Id: 2,
          project_category: 1
        },
        {
          name: 'Apply for a job at NASA.',
          deadline: 'Some date',
          student_Id: 3,
          project_category: 2
        }
      ]);
    });
};