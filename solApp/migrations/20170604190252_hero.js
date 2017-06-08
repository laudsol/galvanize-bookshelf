
exports.up = function(knex, Promise) {
  return knex.schema.createTable('hero',function(table){
    table.increments('id');
    table.string('name');
    table.string('power');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('hero');
};
