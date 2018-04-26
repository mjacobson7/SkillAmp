module.exports = (sequelize, DataTypes) => {
  var rolePermission = sequelize.define('rolePermission', {
    companyId: {
      type: DataTypes.BIGINT,
      allowNull: false
    }
  }, {});
  rolePermission.associate = (models) => {
    // associations can be defined here
  };
  return rolePermission;
};