// var Sequelize = require('sequelize');
// var bcrypt = require('bcrypt');
// var secrets = require('../../config/secrets');
// var sequelize = require('../../config/database');

// // setup User model and its fields.
// var User = sequelize.define('users', {
//     username: {
//         type: Sequelize.STRING,
//         unique: true,
//         allowNull: false
//     },
//     email: {
//         type: Sequelize.STRING,
//         unique: true,
//         allowNull: false
//     },
//     password: {
//         type: Sequelize.STRING,
//         allowNull: false
//     }
// }, {
//     hooks: {
//       beforeCreate: (user) => {
//         const salt = bcrypt.genSaltSync();
//         user.password = bcrypt.hashSync(user.password, salt);
//       }
//     }
// });

// User.prototype.validPassword = function(password) {
//     return bcrypt.compareSync(password,this.password)  
//   }

// // create all the defined tables in the specified database.
// sequelize.sync()
//     .then(() => console.log('users table has been successfully created, if one doesn\'t exist'))
//     .catch(error => console.log('This error occured', error));

// // export User model for use in other files.
// module.exports = User;

