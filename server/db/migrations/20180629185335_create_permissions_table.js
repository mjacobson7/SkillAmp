
exports.up = function(knex, Promise) {
  return Promise.all([
      knex.schema.createTable('permissions', table => {
        table.string('name').primary();
        table.boolean('isAdminPermission');
        table.boolean('isSupervisorPermission');
        table.boolean('isUserPermission');
        table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
      })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
      knex.schema.dropTable('permissions')
  ])
};
