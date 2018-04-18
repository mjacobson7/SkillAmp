'use strict';
module.exports = (sequelize, DataTypes) => {
  var Survey = sequelize.define('Survey', {
    companyId: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      isNumeric: true,
      max: 5,
      min: 1
    },
    like: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    dislike: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    adviceForAgent: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    purchaseReason: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
  }, {});
  Survey.associate = function(models) {
    // associations can be defined here
  };
  return Survey;
};