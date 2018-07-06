
exports.up = function(knex, Promise) {
  return Promise.all([
      knex.schema.createTable('errorDebugInfo', table => {
          table.uuid('id').primary().notNullable();
          table.integer('status');
          table.text('error');
          table.text('request');
          table.string('username');
          table.integer('companyId');
          table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now())
      })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
      knex.schema.dropTable('errorDebugInfo')
  ])
};
