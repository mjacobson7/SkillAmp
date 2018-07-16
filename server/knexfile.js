const Knex = require('knex');

module.exports = {
    client: 'postgres',
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    },
    migrations: { directory: './db/migrations' },
    seeds: { directory: './db/seeds' },
}