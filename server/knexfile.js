const Knex = require('knex');

module.exports = {
    client: 'postgres',
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DATABASE
    },
    migrations: { directory: './db/migrations' },
    seeds: { directory: './db/seeds' },
}