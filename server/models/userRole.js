module.exports = (sequelize, DataTypes) => {
  const userRole = sequelize.define('userRole', {}, {});

  userRole.associate = (models) => {
    userRole.belongsTo(models.company)
  };

  return userRole;
};
