var Sequelize = require('sequelize');
var secrets = require('./secrets');
var sequelize = new Sequelize(secrets.databaseConfig, {
    operatorsAliases: false
});

module.exports.database = sequelize;