const secrets = require('./secrets');
const Sequelize = require('sequelize');

module.exports = () => {
    const sequelize = new Sequelize(secrets.development, {
        operatorsAliases: false
    });

    return sequelize;
}



// module.exports = sequelize;