module.exports = (sequelize, DataTypes) => {
  var userRole = sequelize.define('userRole', {
    companyId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      field: 'company_id'
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
    timestamps: true,
    tableName: 'user_roles'
  });

  userRole.associate = function(models) {
    // associations can be defined here
    userRole.belongsTo(models.role, {
      foreignKey: {
        name: 'roleId',
        field: 'role_id'
      }
    });

  };
  return userRole;
};