const Knex = require('knex');

module.exports = {
    client: 'postgres',
    connection: {
        host: process.env.DB_HOST,
        user: 'postgres',
        password: process.env.DB_PASSWORD,
        database: 'skillamp-dev'
    },
    migrations: { directory: './db/migrations' },
    seeds: { directory: './db/seeds' },
}