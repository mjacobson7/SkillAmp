const massive = require('massive');
const secrets = require('../config/secrets');

module.exports = (app) => {
    let connectionString = secrets.development;
    massive(connectionString).then(db => {
        app.set('db', db);
       });
}