
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('surveys', table => {
          table.increments('id').primary();
          table.integer('companyId').notNullable();
          table.integer('userId').references('users.id').notNullable().onDelete('CASCADE');
          table.integer('rating').notNullable();
          table.text('like');
          table.text('dislike');
          table.text('adviceForAgent');
          table.text('purchaseReason');
          table.string('customerName');
          table.date('callDate');
          table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
        })
    ])
  };
  
  exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('surveys')
    ])
  };
  