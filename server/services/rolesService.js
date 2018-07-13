const RolePermission = require('../models/schema').RolePermission;
const UserRole = require('../models/schema').UserRole;
const Role = require('../models/schema').Role;

module.exports = {

    getUserRoles: (userId, companyId) => {
        return UserRole.query().where({ companyId: companyId, userId: userId });
    },

    getPermissionsByRoleId: (roleId, companyId) => {
        return RolePermission.query().where({ companyId: companyId, roleId: roleId });
    },

    getPermissionByPermissionName: (permissionName, companyId) => {
        return RolePermission.query().where({ permissionName: permissionName, companyId: companyId }).then(permission => permission[0]);
    },

    getRolesByCompanyId: (companyId) => {
        return Role.query().where({companyId, companyId})
    }
}