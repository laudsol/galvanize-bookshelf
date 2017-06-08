
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('hero_fears').del()
    .then(function () {
      // Inserts seed entries
      return knex('hero_fears').insert([
        {id: 1, hero_id: 1, fears_id: 1},
        {id: 2, hero_id: 1, fears_id: 4},
        {id: 3, hero_id: 2, fears_id: 2},
        {id: 4, hero_id: 3, fears_id: 6},
        {id: 5, hero_id: 3, fears_id: 5},
        {id: 6, hero_id: 4, fears_id: 7},
        {id: 7, hero_id: 4, fears_id: 8},
        {id: 8, hero_id:  4, fears_id:1},
        {id: 9, hero_id:  4, fears_id: 2},
        {id: 10, hero_id: 5, fears_id: 1},
        {id: 11, hero_id: 5, fears_id: 2},
        {id: 12, hero_id: 5, fears_id: 6}
      ]);
    });
};
