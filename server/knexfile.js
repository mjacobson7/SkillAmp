const Knex = require('knex');
const config = require('./config');

module.exports = {
    client: 'pg',
    connection: {
        host: config.host,
        user: config.user,
        password: config.password,
        database: config.database
    },
    migrations: { directory: './db/migrations' },
    seeds: { directory: './db/seeds' },
}