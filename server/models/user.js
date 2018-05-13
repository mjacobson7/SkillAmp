module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    companyId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      field: 'company_id'
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'username'
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'first_name'
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'last_name'
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'password'
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'email'
    },
    archived: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: 'archived'
    },
    archivedDate: {
      type: DataTypes.DATE,
      field: 'archived_date'
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

  user.associate = function (models) {
    // associations can be defined here
    user.hasOne(models.user, {
      as: 'supervisor',
      foreignKey: {
        name: 'supervisorId',
        field: 'supervisor_id'
      }
    })
    user.hasMany(models.survey, {
      foreignKey: {
        name: 'userId',
        field: 'user_id'
      }
    })
    user.belongsToMany(models.role, {
      through: models.userRole,
      as: 'roles',
      foreignKey: {
        name: 'userId',
        field: 'user_id'
      }
    })
  };
  return user;
};