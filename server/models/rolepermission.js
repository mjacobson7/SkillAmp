module.exports = (sequelize, DataTypes) => {
  var rolePermission = sequelize.define('rolePermission', {
    companyId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      field: 'company_id'
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
  }, {
    tableName: 'role_permission',
    timestamps: true
  });

  rolePermission.associate = (models) => {
    // associations can be defined here
    rolePermission.belongsTo(models.permission, {
      foreignKey: {
        name: 'permissionName',
        field: 'permission_name'
      }
    })
    rolePermission.belongsTo(models.role, {
      foreignKey: {
        name: 'roleId',
        field: 'role_id'
      }, 
      as: 'roles'
    })
  };
  return rolePermission;
};