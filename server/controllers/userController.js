const bcrypt = require('bcrypt');

const User = require('../models/schema').User
const UserRole = require('../models/schema').UserRole;
const Role = require('../models/schema').Role;

module.exports = {

  createUser: async (req, res) => {
    try {
      let user = req.body;

      user.companyId = req.principal.companyId;

      const salt = bcrypt.genSaltSync();
      user.password = bcrypt.hashSync(user.password, salt);

      if (user.supervisorId) {

        const supervisorRole = await Role.query()
          .select('id')
          .where({ isSupervisorRole: true })

        const existingSupervisorRoles = await UserRole.query()
          .where({ companyId: req.principal.companyId, userId: user.supervisorId, roleId: supervisorRole[0].id })

        if (existingSupervisorRoles.length == 0) {
          await UserRole
            .query()
            .whereNotExists(() => {
              UserRole.query().where({ companyId: req.principal.companyId, userId: user.supervisorId, roleId: supervisorRole[0].id })
            })
            .insert({ companyId: req.principal.companyId, userId: user.supervisorId, roleId: supervisorRole[0].id })
        }

      }

      const newUser = await User
        .query()
        .insert(req.body)

      for (let role of user.roles) {
        await UserRole
          .query()
          .insert({ companyId: newUser.companyId, userId: newUser.id, roleId: role })
      }

      res.status(200).json();
    }
    catch (error) {
      console.trace(error.stack);
      res.status(500).json(error.stack);
    }
  },

  updateUser: async (req, res) => {
    try {
      let user = req.body;

      if (user.password) {
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
      } else {
        delete user.password;
      }

      if (!user.active && !user.archivedDate) {
        user.archivedDate = new Date();
      } else {
        user.archivedDate = null;
      }

      if (user.supervisorId) {

        const existingUser = await User.query()
          .select('supervisorId')
          .where({ id: user.id, companyId: req.principal.companyId })

        if (existingUser[0].supervisorId !== null) {
          const supervisorRole = await Role.query()
          .select('id')
          .where({ isSupervisorRole: true })

          const supervisorTeam = await User.query()
            .where({ supervisorId: existingUser[0].supervisorId })

          if (supervisorTeam.length <= 1) {
            await UserRole.query()
              .delete()
              .where({ companyId: req.principal.companyId, userId: existingUser[0].supervisorId, roleId: supervisorRole[0].id })
          }
        } else {

          const supervisorRole = await Role.query()
            .select('id')
            .where({ isSupervisorRole: true })

          const existingSupervisorRoles = await UserRole.query()
            .where({ companyId: req.principal.companyId, userId: user.supervisorId, roleId: supervisorRole[0].id })

          if (existingSupervisorRoles.length == 0) {
            await UserRole
              .query()
              .whereNotExists(() => {
                UserRole.query().where({ companyId: req.principal.companyId, userId: user.supervisorId, roleId: supervisorRole[0].id })
              })
              .insert({ companyId: req.principal.companyId, userId: user.supervisorId, roleId: supervisorRole[0].id })
          }
        }

      } else {
        const existingUser = await User.query()
          .select('supervisorId')
          .where({ id: user.id, companyId: req.principal.companyId })

        if (existingUser[0].supervisorId) {
          const supervisorRole = await Role.query()
            .select('id')
            .where({ isSupervisorRole: true })

          const supervisorTeam = await User.query()
            .where({ supervisorId: existingUser[0].supervisorId })

          if (supervisorTeam.length <= 1) {
            await UserRole.query()
              .delete()
              .where({ companyId: req.principal.companyId, userId: existingUser[0].supervisorId, roleId: supervisorRole[0].id })
          }
        }
      }

      const newUser = await User
        .query()
        .update(user)
        .where('id', user.id)
        .andWhere('companyId', user.companyId)

      await UserRole
        .query()
        .delete()
        .where('userId', user.id)
        .andWhere('companyId', user.companyId)

      for (let role of user.roles) {
        await UserRole
          .query()
          .insert({ companyId: user.companyId, userId: user.id, roleId: role })
      }

      const updatedUser = await User
        .query()
        .eager('[roles, supervisor]')
        .where({ id: user.id, companyId: user.companyId })

      if (updatedUser[0].id == req.principal.id) {
        res.status(200).json(updatedUser);
      } else {
        res.status(200).json();
      }
    }
    catch (error) {
      console.trace(error.stack);
      res.status(500).json(error.stack);
    }
  },

  deleteUser: async (req, res) => {
    try {
      if (req.principal.id == req.params.id) {
        res.status(400).json("You cannot delete yourself. Please contact an administrator to perform this task.")

      } else {
        await User
          .query()
          .deleteById(req.params.id)

        res.status(200).json();
      }
    }
    catch (error) {
      console.trace(error.stack);
      res.status(500).json(error.stack);
    }
  },

  defaultUserRole: async (req, res) => {
    try {
      const defaultRole = await Role.query()
        .where({ companyId: req.principal.companyId, isUserRole: true })

      res.status(200).json(defaultRole);
    }
    catch (error) {
      console.trace(error.stack);
      res.status(500).json(error.stack);
    }
  },

  getCurrentUser: async (req, res) => {
    try {
      const user = await User
        .query()
        .eager('[roles, supervisor]')
        .where('id', req.principal.id)
        .andWhere('companyId', req.principal.companyId)

      res.status(200).json(user[0]);
    }
    catch (error) {
      console.trace(error.stack);
      res.status(500).json(error.stack);
    }
  },

  getUsersPage: async (req, res) => {
    try {

      let { pageSize, length, pageNumber, orderBy, orderDir, searchText } = req.body;
      let users;

      if (searchText !== "") {
        length = null
        pageNumber = 1
      }

      let offset = (pageNumber - 1) * pageSize;
      searchText = searchText.toLowerCase();

      if (await req.principal.hasPermission('CAN_ADMIN')) {
        users = await User
          .query()
          .eager('[roles, supervisor]')
          .where('companyId', req.principal.companyId)
          .andWhere('username', 'like', '%' + searchText + '%')
          .orWhere('firstName', 'like', '%' + searchText + '%')
          .orWhere('lastName', 'like', '%' + searchText + '%')
          .limit(pageSize)
          .offset(offset)
          .orderBy(orderBy, orderDir)

      } else if (await req.principal.hasPermission('CAN_SUPERVISE')) {
        users = await User
          .query()
          .eager('[roles, supervisor]')
          .where('companyId', req.principal.companyId)
          .andWhere('supervisorId', req.principal.id)
          .orWhere('username', 'like', '%' + searchText + '%')
          .orWhere('firstName', 'like', '%' + searchText + '%')
          .orWhere('lastName', 'like', '%' + searchText + '%')
          .limit(pageSize)
          .offset(offset)
          .orderBy(orderBy, orderDir)

      } else {
        return res.status(403).json();
      }

      let userCount = 0;

      if (searchText === "") {
        count = await User
          .query()
          .count()
          .where('companyId', req.principal.companyId)
        userCount = count[0].count;
      } else {
        userCount = users[0].length;
      }

      let usersPage = {
        content: users,
        length: userCount,
        pageNumber: pageNumber
      }

      res.status(200).json(usersPage);
    }
    catch (error) {
      console.trace(error.stack);
      res.status(500).json(error.stack);
    }
  },

  getUser: async (req, res) => {
    try {
      const user = await User
        .query()
        .eager('[roles, supervisor]')
        .where('id', req.params.id)
        .andWhere('companyId', req.principal.companyId)

      return res.status(200).json(user[0]);
    }
    catch (error) {
      console.trace(error.stack);
      res.status(500).json(error.stack);
    }


  },

  getMyTeam: async (req, res) => {
    // const dbInstance = req.app.get('db');
    try {
      const myTeam = await User
        .query()
        .where('supervisorId', req.principal.id)
        .andWhere('companyId', req.principal.companyId)
      // const myTeam = await dbInstance.get_my_team([req.user.companyId, req.user.id]);
      res.status(200).json(myTeam);
    }
    catch (error) {
      console.trace(error.stack);
      res.status(500).json(error.stack);
    }
  },

  getSupervisorDropdown: async (req, res) => {
    try {
      const supervisors = await User
        .query()
        .select('users.id', 'username', 'firstName', 'lastName')
        .where({ companyId: req.principal.companyId })

      let supervisorList = [];
      for (let supervisor of supervisors) {
        supervisorList.push(
          {
            id: supervisor.id,
            name: supervisor.firstName + ' ' + supervisor.lastName + ' ' + '(' + supervisor.username + ')'
          }
        );
      }
      res.status(200).json(supervisorList);
    }
    catch (error) {
      console.trace(error.stack);
      res.status(500).json(error.stack);
    }
  },

  getRolesDropdown: async (req, res) => {
    try {
      const roles = await Role
        .query()
        .select('id', 'name', 'isUserRole', 'isSupervisorRole')
        .where('companyId', req.principal.companyId)

      for (let role of roles) {
        if (role.isUserRole || role.isSupervisorRole) {
          role.disabled = true;
        }
      }

      res.status(200).json(roles);
    }
    catch (error) {
      console.trace(error.stack);
      res.status(500).json(error.stack);
    }

  }


}; //end
