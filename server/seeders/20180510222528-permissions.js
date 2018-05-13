module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('permissions', [
      {
        name: 'CAN_VIEW_SUPERVISOR_TOOLS_NAV',
        is_admin_permission: true,
        is_supervisor_permission: true,
        is_user_permission: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'CAN_VIEW_MANAGE_USERS_SUB_NAV',
        is_admin_permission: true,
        is_supervisor_permission: true,
        is_user_permission: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'CAN_VIEW_TEAM_SURVEYS_SUB_NAV',
        is_admin_permission: true,
        is_supervisor_permission: true,
        is_user_permission: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'CAN_VIEW_PROFILE_NAV',
        is_admin_permission: true,
        is_supervisor_permission: true,
        is_user_permission: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'CAN_VIEW_SYSTEM_MANAGEMENT_NAV',
        is_admin_permission: true,
        is_supervisor_permission: false,
        is_user_permission: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'CAN_VIEW_DASHBOARD_NAV',
        is_admin_permission: true,
        is_supervisor_permission: true,
        is_user_permission: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'CAN_VIEW_SURVEYS_NAV',
        is_admin_permission: false,
        is_supervisor_permission: false,
        is_user_permission: true,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
