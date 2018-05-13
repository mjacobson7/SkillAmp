module.exports = (sequelize, DataTypes) => {
  var role = sequelize.define('role', {
    companyId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      field: 'company_id'
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'name'
    },
    isUserRole: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      field: 'is_user_role'
    },
    isSupervisorRole: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      field: 'is_supervisor_role'
    },
    isAdminRole: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      field: 'is_admin_role'
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at'
    }
  }, 
  {
    timestamps: true
  });
  role.associate = function (models) {
    // associations can be defined here
    role.belongsToMany(models.user, {
      through: models.userRole,
      as: 'user',
      foreignKey: {
        name: 'roleId',
        field: 'role_id'
      }
    });
    role.belongsToMany(models.permission, {
      through: models.rolePermission,
      foreignKey: {
        name: 'roleId',
        field: 'role_id'
      },
      as: 'permissions'
    });
  };
  return role;
};