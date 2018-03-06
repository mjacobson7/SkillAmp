module.exports = (sequelize, DataTypes) => {
  const userRole = sequelize.define('userRole', {}, {});

  return userRole;
};
