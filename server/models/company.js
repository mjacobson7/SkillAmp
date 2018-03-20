module.exports = (sequelize, DataTypes) => {
  const company = sequelize.define('company', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    hostname: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});

  company.associate = (models) => {
    company.hasMany(models.user);
    company.hasMany(models.feedback);
    company.hasMany(models.userRole);
  };


  return company;
};
