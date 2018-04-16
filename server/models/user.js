module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    companyId: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});

  User.associate = function (models) {
    // associations can be defined here
    User.hasOne(models.User, {
      as: 'supervisor',
      foreignKey: 'supervisorId'
    })
    User.hasMany(models.Feedback, {
      foreignKey: 'userId'
    })
    User.belongsToMany(models.Role, {
      through: models.UserRole,
      as: 'roles',
      foreignKey: 'userId'
    })
  };
  return User;
};