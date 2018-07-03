
exports.up = function (knex, Promise) {
    return Promise.all([
        knex.schema.createTable('rolePermission', table => {
            table.integer('companyId').notNullable();
            table.primary(['roleId', 'permissionName']);
            table.integer('roleId').references('roles.id').notNullable();
            table.string('permissionName').references('permissions.name').notNullable();
            table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
        })
    ])
};

exports.down = function (knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('rolePermission')
    ])
};
