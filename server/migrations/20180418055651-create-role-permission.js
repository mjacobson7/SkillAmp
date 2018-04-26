module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('rolePermissions', {
      companyId: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      roleId: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Roles',
          key: 'id'
        }
      },
      permissionName: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Permissions',
          key: 'name'
        }
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
    return queryInterface.dropTable('rolePermissions');
  }
};