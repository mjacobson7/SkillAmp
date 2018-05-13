module.exports = (sequelize, DataTypes) => {
  var permission = sequelize.define('permission', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      field: 'name'
    },
    isAdminPermission: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      field: 'is_admin_permission'
    },
    isSupervisorPermission: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      field: 'is_supervisor_permission'
    },
    isUserPermission: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      field: 'is_user_permission'
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: 'created_at'
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: 'updated_at'
    }
  },
    {
      timestamps: true
    });

  permission.associate = (models) => {
    // associations can be defined here
    permission.belongsToMany(models.role, {
      through: models.rolePermission,
      foreignKey: {
        name: 'permissionName',
        field: 'permission_name'
      },
      as: 'roles'
    })
  };
  return permission;
};