module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('permissions', {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
      },
      is_admin_permission: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      is_supervisor_permission: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      is_user_permission: {
        type: Sequelize.BOOLEAN,
        allowNull: false
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
    return queryInterface.dropTable('permissions');
  }
};