const secrets = require('./secrets');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(secrets.development, {
    operatorsAliases: false
});

module.exports = sequelize;