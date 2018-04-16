module.exports = (sequelize, DataTypes) => {
  var UserRole = sequelize.define('UserRole', {
    companyId: {
      type: DataTypes.BIGINT,
      allowNull: false
    }
  }, {});

  UserRole.associate = function(models) {
    // associations can be defined here
  };
  return UserRole;
};