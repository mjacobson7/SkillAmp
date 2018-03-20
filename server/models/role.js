module.exports = (sequelize, DataTypes) => {
  const role = sequelize.define('role', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING
    },
  }, {});

  role.associate = (models) => {
    role.belongsToMany(models.user, {
      through: models.userRole
    })
  };

  return role;
};
