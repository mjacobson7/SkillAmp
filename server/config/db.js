const secrets = require('./secrets');
const Sequelize = require('sequelize');
require('dotenv').config(); 

module.exports = () => {
    const sequelize = new Sequelize(
        secrets.dev.database, 
        secrets.dev.username, 
        secrets.dev.password, 
        { 
            dialect: secrets.dev.dialect, 
            operatorsAliases: false
        }   
    );

    return sequelize;
}