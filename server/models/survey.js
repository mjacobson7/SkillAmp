'use strict';
module.exports = (sequelize, DataTypes) => {
  var survey = sequelize.define('survey', {
    companyId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      field: 'company_id'
    },
    rating: {
      type: DataTypes.INTEGER,
      field: 'rating',
      allowNull: false,
      isNumeric: true,
      max: 5,
      min: 1
    },
    like: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'like'
    },
    dislike: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'dislike'
    },
    adviceForAgent: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'advice_for_agent'
    },
    purchaseReason: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'purchase_reason'
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
  survey.associate = function(models) {
    // associations can be defined here
  };
  return survey;
};