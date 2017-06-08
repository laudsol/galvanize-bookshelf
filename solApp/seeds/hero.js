
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('hero').del()
    .then(function () {
      // Inserts seed entries
      return knex('hero').insert([
        {id: 1, name: 'batman', power: 'cool gear'},
        {id: 2, name: 'superman', power: 'dating reporters'},
        {id: 3, name: 'spiderman', power: 'none'},
        {id: 4, name: 'magneto', power: 'all the power'},
        {id: 5, name: 'theDonald', power: 'orange'},
      ]);
    });
};
