module.exports = (sequelize, DataTypes) => {
  var Permission = sequelize.define('Permission', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    isAdminPermission: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    isSupervisorPermission: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    isUserPermission: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {});
  Permission.associate = (models) => {
    // associations can be defined here
    Permission.belongsToMany(models.Role, {
      through: models.rolePermission,
      foreignKey: 'permissionName'
    })
  };
  return Permission;
};