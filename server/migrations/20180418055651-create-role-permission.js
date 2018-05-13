module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('role_permission', {
      company_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      role_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'roles',
          key: 'id'
        }
      },
      permission_name: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'permissions',
          key: 'name'
        }
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
    return queryInterface.dropTable('role_permission');
  }
};