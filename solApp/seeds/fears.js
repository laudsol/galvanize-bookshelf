
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('fears').del()
    .then(function () {
      // Inserts seed entries
      return knex('fears').insert([
        {id: 1, type: 'dark'},
        {id: 2, type: 'light'},
        {id: 3, type: 'water'},
        {id: 4, type: 'air'},
        {id: 5, type: 'people'},
        {id: 6, type: 'flying'},
        {id: 7, type: 'drinking'},
        {id: 8, type: 'sleeping'},
      ]);
    });
};
