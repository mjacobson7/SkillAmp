const Sequelize = require('sequelize'),
      bcrypt = require('bcrypt'),
      secrets = require('../../config/secrets'),
      sequelize = require('../../config/db')();

var User = sequelize.define('user', {
    username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    firstName: {
        type: Sequelize.STRING,
        unique: false,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        unique: false,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    supervisor: {
        type: Sequelize.STRING,
        unique: false,
        allowNull: true
    },
    role: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        unique: false,
        allowNull: false,
        defaultValue: ['User']
    }

}, 
{
    hooks: {
      beforeCreate: (user) => {
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
      }
    }
});

User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password,this.password)  
  }

sequelize.sync()
    .then(() => console.log('users table has been successfully created, if one doesn\'t exist'))
    .catch(error => console.log('This error occured', error));

module.exports = User;