const bcrypt = require('bcrypt');
const Company = require('../models/index').Company;
const Role = require('../models/index').Role;
const User = require('../models/index').User;
const UserRole = require('../models/index').UserRole;
const dotenv = require('dotenv').config();

module.exports = {

  createCompany: async (req, res) => {
    try {
      const salt = bcrypt.genSaltSync();
      let company = await Company.create({ name: req.body.name, hostname: req.body.hostname });
      let roles = await Role.bulkCreate([
        { companyId: company.id, name: 'User', isUserRole: true, isSupervisorRole: false, isAdminRole: false },
        { companyId: company.id, name: 'Supervisor', isUserRole: false, isSupervisorRole: true, isAdminRole: false },
        { companyId: company.id, name: 'Admin', isUserRole: false, isSupervisorRole: false, isAdminRole: true }
      ],{individualHooks: true});
      let user = await User.create({
        companyId: company.id,
        username: 'skillampsupport',
        firstName: 'SkillAmp',
        lastName: 'Support',
        password: bcrypt.hashSync(process.env.SUPPORT_PASSWORD, salt),
        email: process.env.SUPPORT_EMAIL
      })

      roles.forEach(role => {
        UserRole.create({companyId: company.id, userId: user.id, roleId: role.id})
      })

      res.status(200).json("Success");
    }
    catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

};
