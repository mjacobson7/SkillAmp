
exports.up = function(knex, Promise) {
  return Promise.all([
      knex.schema.createTable('users', table => {
        table.increments('id').primary();
        table.integer('companyId');
        table.string('username').notNullable();
        table.string('firstName').notNullable();
        table.string('lastName').notNullable();
        table.string('password').notNullable();
        table.string('email').notNullable();
        table.integer('supervisorId').references('users.id');
        table.boolean('archived').defaultTo(false);
        table.date('archivedDate');
        table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
      })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
      knex.schema.dropTable('users')
  ])
};
