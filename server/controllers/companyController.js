const bcrypt = require('bcrypt');
const config = require('../config');
const Permission = require('../models/schema').Permission;
const RolePermission = require('../models/schema').RolePermission;
const UserRole = require('../models/schema').UserRole;

const companyService = require('../services/companyService');
const userService = require('../services/userService');

module.exports = {

  createCompany: async (req, res) => {
    try {
      let { name, hostname } = req.body;
      const salt = bcrypt.genSaltSync();
      const company = await companyService.createCompany(name, hostname);
      const roles = await companyService.insertCompanyDefaultRoles(company.id);

      const user = await userService.createUser({
        companyId: company.id,
        username: 'skillampsupport',
        firstName: 'SkillAmp',
        lastName: 'Support',
        password: bcrypt.hashSync(config.supportPassword, salt),
        email: 'support@skillamp.io'
      })

      const userPermission = await Permission.query().where('isUserPermission', true);
      const supervisorPermission = await Permission.query().where('isSupervisorPermission', true);
      const adminPermission = await Permission.query().where('isAdminPermission', true);


      for (let role of roles) {
        if (role.isUserRole) {
          for (let permission of userPermission) {
            await RolePermission.query().insert({ companyId: company.id, roleId: role.id, permissionName: permission.name })
          }
        } else if (role.isSupervisorRole) {
          for (let permission of supervisorPermission) {
            await RolePermission.query().insert({ companyId: company.id, roleId: role.id, permissionName: permission.name })
          }
        } else if (role.isAdminRole) {
          for (let permission of adminPermission) {
            await RolePermission.query().insert({ companyId: company.id, roleId: role.id, permissionName: permission.name })
          }
        }
        await UserRole.query().insert({ companyId: company.id, userId: user.id, roleId: role.id })
      }

      res.status(200).json("Company Successfully Created!");
    }
    catch (error) {
      console.trace(error.stack);
      res.status(500).json(error.stack);
    }
  },

};
