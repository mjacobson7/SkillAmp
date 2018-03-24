const User = require('../models/index').user;
const UserRole = require('../models/index').userRole;
const Role = require('../models/index').role;
const sequelize = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = {

  updateUser: async (req, res) => {
      let { id, companyId, username, firstName, lastName, password, email, supervisor, roles } = req.body;
      const dbInstance = req.app.get('db');
      if(password) {
        const salt = bcrypt.genSaltSync();
        password = bcrypt.hashSync(password, salt);
      }
      
      try {
        await dbInstance.update_user([username, firstName, lastName, password, email, supervisor, id, companyId]);
        const existingRoles = await dbInstance.get_user_roles([companyId, id]);
        let existingRoleIds = [];
        existingRoles.map(role => existingRoleIds.push(role.id));

        existingRolesDiff = existingRoleIds.filter(x => roles.indexOf(x) < 0 );

        if(existingRolesDiff.length > 0) {
          // remove roles
            for(let roleId of existingRolesDiff) {
            await dbInstance.delete_user_roles([id, companyId, roleId]);                        
          }
        }

        newRolesDiff = roles.filter(x => existingRoleIds.indexOf(x) < 0 );

        if(newRolesDiff.length > 0) {
          // add roles
          for(let roleId of newRolesDiff) {
            await dbInstance.add_user_roles([companyId, id, roleId]);                        
          }
        }

        const user = await dbInstance.get_user_by_id([id, companyId]); 
        res.status(200).json(user[0]);
      }
      catch (error) {
        console.log(error);
        res.status(500).json(error);
      }
  },

  getCurrentUser: async (req, res) => {
    const dbInstance = req.app.get('db');
    try {
      const user = await dbInstance.get_user_by_id([req.principal.id, req.principal.companyId]);
      const supervisor = await dbInstance.get_supervisor([req.principal.supervisorId]);
      const roles = await dbInstance.get_user_roles([req.principal.companyId, req.principal.id]);
      if (roles.length > 0) {
        user[0].roles = roles;
      }

      if (supervisor.length > 0) {
        user[0].supervisor = supervisor[0];
        res.status(200).json(user[0]);
      } else {
        res.status(200).json(user[0]);
      }
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
    const dbInstance = req.app.get('db');
    try {
      const supervisors = await dbInstance.get_supervisor_dropdown([req.principal.companyId]);
      let supervisorDropdownList = [];
      supervisors.forEach(supervisor => {
        let supervisorObj = {};
        supervisorObj.id = supervisor.id;
        supervisorObj.name = supervisor.firstName + ' ' + supervisor.lastName + ' ' + '(' + supervisor.username + ')';
        supervisorDropdownList.push(supervisorObj);
      });
      res.status(200).json(supervisorDropdownList);
    }
    catch (error) {
      res.status(500).json(error);
    }

  },

  getRolesDropdown: async (req, res) => {
    const dbInstance = req.app.get('db');
    try {
      const roles = await dbInstance.get_all_roles();
      let roleDropdownList = [];
      roles.forEach(role => {
        let roleObj = {};
        roleObj.id = role.id;
        roleObj.name = role.name;
        roleDropdownList.push(roleObj);
      });
      res.status(200).json(roleDropdownList);
    }
    catch (error) {
      res.status(500).json(error);
    }
  }


}; //end
