const bcrypt = require('bcrypt');


module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      // validate: {
      //   notEmpty: true
      // }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    }
  },
    {});

  user.associate = (models) => {
    user.belongsTo(models.user, {
      foreignKey: 'supervisorId',
      as: "supervisor"
    });
    user.belongsTo(models.company);
    user.hasMany(models.feedback);
    user.belongsToMany(models.role, {
      through: models.userRole
    })
  };

  // user.hook('beforeCreate', (user) => {
  //   const salt = bcrypt.genSaltSync();
  //   user.password = bcrypt.hashSync(user.password, salt);
  // });

  user.beforeCreate(user => {
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(user.password, salt);
  });

  user.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password)
  };

  user.prototype.getFullName = function () {
    return this.firstName + " " + this.lastName;
  };

  return user;
};
