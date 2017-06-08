
exports.up = function(knex, Promise) {
  return knex.schema.createTable('hero_fears',function(table){
    table.increments('id');
    table.integer('hero_id');
    table.integer('fears_id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('hero_fears');
};
