'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Permissions', {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
      },
      isAdminPermission: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      isSupervisorPermission: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      isUserPermission: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Permissions');
  }
};