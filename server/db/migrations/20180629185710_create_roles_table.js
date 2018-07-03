
exports.up = function(knex, Promise) {
  Promise.all([
      knex.schema.createTable('roles', table => {
        table.increments('id').primary();
        table.integer('companyId');
        table.string('name');
        table.boolean('isUserRole');
        table.boolean('isSupervisorRole');
        table.boolean('isAdminRole');
        table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
      })
  ])
};

exports.down = function(knex, Promise) {
  knex.schema.dropTable('roles');
};
