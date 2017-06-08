
exports.up = function(knex, Promise) {
  return knex.schema.createTable('fears',function(table){
    table.increments('id');
    table.string('type');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('fears');
};
