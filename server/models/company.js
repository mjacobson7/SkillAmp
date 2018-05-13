module.exports = (sequelize, DataTypes) => {
  var company = sequelize.define('company', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'name'
    },
    hostname: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'hostname'
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
      timestamps: true,
      tableName: 'company'
    });

  company.associate = function (models) {
    // associations can be defined here
  };
  return company;
};