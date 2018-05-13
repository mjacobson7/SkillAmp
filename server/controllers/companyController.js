const bcrypt = require('bcrypt');
const Company = require('../models/index').company;
const Role = require('../models/index').role;
const User = require('../models/index').user;
const UserRole = require('../models/index').userRole;
const RolePermission = require('../models/index').rolePermission;
const Permission = require('../models/index').permission;

module.exports = {

  createCompany: async (req, res) => {
    try {
      const salt = bcrypt.genSaltSync();
      let company = await Company.create({ name: req.body.name, hostname: req.body.hostname });
      let roles = [];
      let userRole = await Role.create({ companyId: company.id, name: 'User', isUserRole: true, isSupervisorRole: false, isAdminRole: false });
      roles.push(userRole);
      let supervisorRole = await Role.create({ companyId: company.id, name: 'Supervisor', isUserRole: false, isSupervisorRole: true, isAdminRole: false });
      roles.push(supervisorRole);
      let adminRole = await Role.create({ companyId: company.id, name: 'Admin', isUserRole: false, isSupervisorRole: false, isAdminRole: true });
      roles.push(adminRole);

      let user = await User.create({
        companyId: company.id,
        username: 'skillampsupport',
        firstName: 'SkillAmp',
        lastName: 'Support',
        password: bcrypt.hashSync(process.env.SUPPORT_PASSWORD, salt),
        email: 'support@skillamp.io'
      })

      let userPermission = await Permission.findAll({ where: { isUserPermission: true } });
      let supervisorPermission = await Permission.findAll({ where: { isSupervisorPermission: true } });
      let adminPermission = await Permission.findAll({ where: { isAdminPermission: true } });
      

      roles.forEach(role => {
        if(role.isUserRole) {
          userPermission.forEach(permission => {
            RolePermission.create({ companyId: company.id, roleId: role.id, permissionName: permission.name })          
          })
        } else if(role.isSupervisorRole) {
          supervisorPermission.forEach(permission => {
            RolePermission.create({ companyId: company.id, roleId: role.id, permissionName: permission.name })          
          })
        } else {
          adminPermission.forEach(permission => {
            RolePermission.create({ companyId: company.id, roleId: role.id, permissionName: permission.name })          
          })
        }
        UserRole.create({ companyId: company.id, userId: user.id, roleId: role.id })
      }); 

      
      res.status(200).json("Success"); 
    }
    catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
 
};
