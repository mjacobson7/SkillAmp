module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('surveys', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      company_id: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      user_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      rating: {
        type: Sequelize.INTEGER,
        allowNull: false,
        isNumeric: true,
        max: 5,
        min: 1
      },
      like: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      dislike: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      advice_for_agent: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      purchase_reason: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('surveys');
  }
};