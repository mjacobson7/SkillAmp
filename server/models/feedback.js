module.exports = (sequelize, DataTypes) => {
  const feedback = sequelize.define('feedback', {
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    like: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    dislike: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    productDescription: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
  },
  {
    freezeTableName: true
  });

  feedback.associate = (models) => {
    feedback.belongsTo(models.company);
    feedback.belongsTo(models.user);
  };


  return feedback;
};
