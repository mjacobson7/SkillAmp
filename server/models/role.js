module.exports = (sequelize, DataTypes) => {
  var Role = sequelize.define('Role', {
    companyId: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isUserRole: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    isSupervisorRole: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    isAdminRole: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {});
  Role.associate = function (models) {
    // associations can be defined here
    Role.belongsToMany(models.User, {
      through: models.UserRole,
      as: 'user',
      foreignKey: 'roleId'
    })
  };
  return Role;
};