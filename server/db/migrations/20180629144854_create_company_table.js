
exports.up = function(knex, Promise) {
  return Promise.all([
      knex.schema.createTable('company', table => {
          table.increments('id').primary();
          table.string('name').notNullable();
          table.string('hostname').notNullable().unique();
          table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now())
      })      
      
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
      knex.schema.dropTable('company')
  ])
};
