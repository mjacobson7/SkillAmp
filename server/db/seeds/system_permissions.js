
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('permissions').del().then(() => {
    // Inserts seed entries
    return knex('permissions').insert([
      { name: 'CAN_ADMIN', isAdminPermission: true, isSupervisorPermission: false, isUserPermission: false, createdAt: new Date() },
      { name: 'CAN_SUPERVISE', isAdminPermission: false, isSupervisorPermission: true, isUserPermission: false, createdAt: new Date() },
      { name: 'CAN_VIEW_ADMIN_DASHBOARD', isAdminPermission: true, isSupervisorPermission: true, isUserPermission: false, createdAt: new Date() },
      { name: 'CAN_EDIT_PROFILE_USERNAME_FIELD', isAdminPermission: true, isSupervisorPermission: false, isUserPermission: false, createdAt: new Date() },
      { name: 'CAN_EDIT_PROFILE_FIRST_NAME_FIELD', isAdminPermission: true, isSupervisorPermission: false, isUserPermission: false, createdAt: new Date() },
      { name: 'CAN_EDIT_PROFILE_LAST_NAME_FIELD', isAdminPermission: true, isSupervisorPermission: false, isUserPermission: false, createdAt: new Date() },
      { name: 'CAN_EDIT_PROFILE_EMAIL_ADDRESS_FIELD', isAdminPermission: true, isSupervisorPermission: false, isUserPermission: false, createdAt: new Date() },
      { name: 'CAN_EDIT_PROFILE_SUPERVISOR_FIELD', isAdminPermission: true, isSupervisorPermission: false, isUserPermission: false, createdAt: new Date() },
      { name: 'CAN_EDIT_PROFILE_ROLE_FIELD', isAdminPermission: true, isSupervisorPermission: false, isUserPermission: false, createdAt: new Date() },
      { name: 'CAN_VIEW_TEAM_SURVEYS_SUB_NAV', isAdminPermission: true, isSupervisorPermission: true, isUserPermission: false, createdAt: new Date() },
      { name: 'CAN_VIEW_MANAGE_USERS_SUB_NAV', isAdminPermission: true, isSupervisorPermission: true, isUserPermission: false, createdAt: new Date() },
      { name: 'CAN_EDIT_USERS', isAdminPermission: true, isSupervisorPermission: false, isUserPermission: false, createdAt: new Date() },
      { name: 'CAN_EDIT_USERNAME_FIELD', isAdminPermission: true, isSupervisorPermission: true, isUserPermission: false, createdAt: new Date() },
      { name: 'CAN_EDIT_FIRST_NAME_FIELD', isAdminPermission: true, isSupervisorPermission: true, isUserPermission: false, createdAt: new Date() },
      { name: 'CAN_EDIT_LAST_NAME_FIELD', isAdminPermission: true, isSupervisorPermission: true, isUserPermission: false, createdAt: new Date() },
      { name: 'CAN_EDIT_EMAIL_ADDRESS_FIELD', isAdminPermission: true, isSupervisorPermission: true, isUserPermission: false, createdAt: new Date() },
      { name: 'CAN_EDIT_SUPERVISOR_FIELD', isAdminPermission: true, isSupervisorPermission: false, isUserPermission: false, createdAt: new Date() },
      { name: 'CAN_EDIT_ROLE_FIELD', isAdminPermission: true, isSupervisorPermission: false, isUserPermission: false, createdAt: new Date() },
      { name: 'CAN_DELETE_USERS', isAdminPermission: true, isSupervisorPermission: false, isUserPermission: false, createdAt: new Date() },
      { name: 'CAN_CREATE_USERS', isAdminPermission: true, isSupervisorPermission: false, isUserPermission: false, createdAt: new Date() },
      { name: 'CAN_VIEW_SYSTEM_MANAGEMENT_NAV', isAdminPermission: true, isSupervisorPermission: false, isUserPermission: false, createdAt: new Date() },
      { name: 'CAN_VIEW_NOTIFICATIONS_SUB_NAV', isAdminPermission: true, isSupervisorPermission: false, isUserPermission: false, createdAt: new Date() },
      { name: 'CAN_VIEW_PERMISSIONS_SUB_NAV', isAdminPermission: true, isSupervisorPermission: false, isUserPermission: false, createdAt: new Date() },
    ]);
  });
};
