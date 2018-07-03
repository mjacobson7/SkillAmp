
exports.up = function (knex, Promise) {
    return Promise.all([
        knex.schema.createTable('userRoles', table => {
            table.integer('companyId');
            table.primary(['userId', 'roleId']);
            table.integer('userId').references('users.id');
            table.integer('roleId').references('roles.id');
            table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
        })
    ])
};

exports.down = function (knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('userRoles')
    ])
};
