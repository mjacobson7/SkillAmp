
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('permissions').del().then(() => {
    // Inserts seed entries
    return knex('permissions').insert([
      { name: 'CAN_ADMIN', isAdminPermission: true, isSupervisorPermission: false, isUserPermission: false, createdAt: new Date() },
      { name: 'CAN_SUPERVISE', isAdminPermission: false, isSupervisorPermission: true, isUserPermission: false, createdAt: new Date() },
      { name: 'CAN_EDIT_PROFILE', isAdminPermission: true, isSupervisorPermission: false, isUserPermission: false, createdAt: new Date() },
      { name: 'CAN_EDIT_USERS', isAdminPermission: true, isSupervisorPermission: false, isUserPermission: false, createdAt: new Date() },
      { name: 'CAN_DELETE_USERS', isAdminPermission: true, isSupervisorPermission: false, isUserPermission: false, createdAt: new Date() },
      { name: 'CAN_CREATE_USERS', isAdminPermission: true, isSupervisorPermission: false, isUserPermission: false, createdAt: new Date() },
    ]);
  });
};
