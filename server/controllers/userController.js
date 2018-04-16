const bcrypt = require('bcrypt');
const User = require('../models/index').User;
const Role = require('../models/index').Role;
const UserRole = require('../models/index').UserRole;

module.exports = {

  updateUser: async (req, res) => {
    try {
      let user = req.body;
      console.log(user.password);
      // Object.keys(user).forEach((key) => (user[key] == null) && delete user[key]);

      if (user.password) {
        console.log("user.password ", user.password)
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
      } else {
        delete user.password;
      }

      let newUser = await User.update(user, { where: { id: user.id, companyId: user.companyId } })
      await UserRole.destroy({ where: { userId: user.id, companyId: user.companyId } }).then(() => {
        user.roles.forEach(role => {
          UserRole.create({ companyId: user.companyId, userId: user.id, roleId: role })
        })
      })

      const updatedUser = await User.findOne({
        where: { id: user.id, companyId: user.companyId },
        include: [{
          model: Role,
          as: 'roles',
          through: { attributes: [] }
        }, 
        {
          model: User,
          as: 'supervisor'
        }]
      })

      //supervisor eventually
      res.status(200).json(updatedUser);
    }
    catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  getCurrentUser: async (req, res) => {
    try {
      const user = await User.findOne({
        where: { id: req.principal.id, companyId: req.principal.companyId },
        include: [{
          model: Role,
          as: 'roles',
          through: { attributes: [] }
        }]
        //include supervisor????
      })
      res.status(200).json(user);
    }
    catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  getAllUsers: async (req, res) => {
    const dbInstance = req.app.get('db');
    try {
      const users = await dbInstance.get_all_users([req.user.companyId]);
      res.status(200).json(users);
    }
    catch (error) {
      res.status(500).json(error);
    }
  },

  getMyTeam: async (req, res) => {
    const dbInstance = req.app.get('db');
    try {
      const myTeam = await dbInstance.get_my_team([req.user.companyId, req.user.id]);
      res.status(200).json(myTeam);
    }
    catch (error) {
      res.status(500).json(error);
    }
  },

  getSupervisorDropdown: async (req, res) => {
    try {
      const supervisors = await User.findAll({
        where: { companyId: req.principal.companyId },
        attributes: ['id', 'username', 'firstName', 'lastName'],
        include: [{
          model: Role,
          as: 'roles',
          where: { isSupervisorRole: true },
          through: { attributes: [] }
        }]
      })
      let supervisorList = [];
      supervisors.forEach(supervisor => {
        supervisorList.push(
          {
            id: supervisor.id,
            name: supervisor.firstName + ' ' + supervisor.lastName + ' ' + '(' + supervisor.username + ')'
          }
        );
      })
      res.status(200).json(supervisorList);
    }
    catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  getRolesDropdown: async (req, res) => {
    try {
      const roles = await Role.findAll({ where: { companyId: req.principal.companyId }, attributes: ['id', 'name'] })
      res.status(200).json(roles);
    }
    catch (error) {
      console.log(error);
      res.status(500).json(error);
    }


    // const dbInstance = req.app.get('db');
    // try {
    //   const roles = await dbInstance.get_all_roles();
    //   let roleDropdownList = [];
    //   roles.forEach(role => {
    //     let roleObj = {};
    //     roleObj.id = role.id;
    //     roleObj.name = role.name;
    //     roleDropdownList.push(roleObj);
    //   });
    //   res.status(200).json(roleDropdownList);
    // }
    // catch (error) {
    //   res.status(500).json(error);
    // }
  }


}; //end
