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

      // let newUser = await User.create(req.body);

      const newUser = await User
        .query()
        .insert(req.body)

      for (let role of user.roles) {
        await UserRole
          .query()
          .insert({ companyId: newUser.companyId, userId: newUser.id, roleId: role })
        // await UserRole.create({ companyId: newUser.companyId, userId: newUser.id, roleId: role })
      }

      res.status(200).json();
    }
    catch (error) {
      console.log(error);
      res.status(500).json(error);
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

      const newUser = await User
        .query()
        .update(user)
        .where('id', user.id)
        .andWhere('companyId', user.companyId)

      // let newUser = await User.update(user, { where: { id: user.id, companyId: user.companyId } })

      await UserRole
        .query()
        .delete()
        .where('userId', user.id)
        .andWhere('companyId', user.companyId)

      // await UserRole.destroy({ where: { userId: user.id, companyId: user.companyId } })

      for (let role of user.roles) {
        await UserRole
          .query()
          .insert({ companyId: user.companyId, userId: user.id, roleId: role })
        // await UserRole.create({ companyId: user.companyId, userId: user.id, roleId: role })
      }

      //is it necessary to send back the updated user??

      const updatedUser = await User
        .query()
        .eager('[roles, supervisor]')
        .where('id', user.id)
        .andWhere('companyId', user.companyId)



      // const updatedUser = await User.findOne({
      //   where: { id: user.id, companyId: user.companyId },
      //   include: [{
      //     model: Role,
      //     as: 'roles',
      //     through: { attributes: [] }
      //   },
      //   {
      //     model: User,
      //     as: 'supervisor'
      //   }]
      // })

      //supervisor eventually
      res.status(200).json(updatedUser[0]);
    }
    catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  getCurrentUser: async (req, res) => {
    try {
      const user = await User
        .query()
        .eager('[roles, supervisor]')
        .where('id', req.principal.id)
        .andWhere('companyId', req.principal.companyId)


      // const user = await User.findOne({
      //   where: { id: req.principal.id, companyId: req.principal.companyId },
      //   include: [{ model: Role, as: 'roles', through: { attributes: [] } }]
      //   //include supervisor????
      // })

      // let userRoles = await UserRole.findAll({
      //   where: { companyId: req.principal.companyId, userId: req.principal.id },
      //   attributes: ['roleId']
      // })

      // let userPermissions = [];
      // for (let role of userRoles) {
      //   let permissions = await RolePermission.findAll({
      //     where: { companyId: req.principal.companyId, roleId: role.roleId },
      //     attributes: ['permissionName']
      //   })
      //   if (permissions.length > 0) {
      //     permissions.forEach(permission => {
      //       userPermissions.push(permission.permissionName);
      //     })
      //   }
      // }

      // let permissionsMap = {};

      // userPermissions.forEach(currPermission => {
      //   if (userPermissions.includes(currPermission)) {
      //     permissionsMap[currPermission] = true;
      //   }
      // });

      res.status(200).json(user[0]);
    }
    catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  getUsersPage: async (req, res) => {
    try {
      //todo check if admin or supervisor and return ONLY the users that pertain to their role.  
      //If they are an admin AND a supervisor, then return all users of the company

      let { pageSize, length, pageNumber, orderBy, orderDir, searchText } = req.body;

      if (searchText !== "") {
        length = null
        pageNumber = 1
      }

      let offset = (pageNumber - 1) * pageSize;
      searchText = searchText.toLowerCase();

      const users = await User
        .query()
        .eager('[roles, supervisor]')
        .where('companyId', req.principal.companyId)
        .orWhere('username', 'like', '%searchText%')
        .orWhere('firstName', 'like', '%searchText%')
        .orWhere('lastName', 'like', '%searchText%')
        .limit(pageSize)
        .offset(offset)
        .orderBy(orderBy, orderDir)

      // const users = await User.findAll({
      //   where: {
      //     companyId: req.principal.companyId,
      //     $or: [
      //       { username: { $ilike: '%' + searchText + '%' } },
      //       { firstName: { $ilike: '%' + searchText + '%' } },
      //       { lastName: { $ilike: '%' + searchText + '%' } },
      //     ]
      //   },
      //   limit: pageSize,
      //   offset: offset,
      //   order: [[orderBy, orderDir]],
      //   include: [
      //     {
      //       model: Role,
      //       as: 'roles',
      //       through: { attributes: [] }
      //     },
      //     {
      //       model: User,
      //       as: 'supervisor'
      //     }
      //   ]
      // })

      let userCount = 0;

      if (searchText === "") {
        count = await User
          .query()
          .count()
          .where('companyId', req.principal.companyId)
        userCount = count[0].count;
        // userCount = await User.count({ where: { companyId: req.principal.companyId } })
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
      console.log(error);
      res.status(500).json(error);
    }
  },

  getUser: async (req, res) => {
    try {
      const user = await User
        .query()
        .eager('[roles, supervisor]')
        .where('id', req.params.id)
        .andWhere('companyId', req.principal.companyId)

      // const user = await User.findOne({
      //   where: { id: req.params.id, companyId: req.principal.companyId },
      //   include: [
      //     {
      //       model: Role,
      //       as: 'roles',
      //       through: { attributes: [] }
      //     },
      //     {
      //       model: User,
      //       as: 'supervisor'
      //     }
      //   ]
      // })
      return res.status(200).json(user[0]);
    }
    catch (error) {
      console.log(error);
      res.status(500).json(error);
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
      res.status(500).json(error);
    }
  },

  getSupervisorDropdown: async (req, res) => {
    // req.principal.getRoles();
    try {
      const supervisors = await User
        .query()
        .select('users.id', 'username', 'firstName', 'lastName')
        .joinRelation('roles')
        .where('users.companyId', req.principal.companyId)
        .andWhere('roles.isSupervisorRole', true) //might want to remove this if we want to allow anyone to be chosen as supervisor

      // const supervisors = await User.findAll({
      //   where: { companyId: req.principal.companyId },
      //   attributes: ['id', 'username', 'firstName', 'lastName'],
      //   include: [{
      //     model: Role,
      //     as: 'roles',
      //     where: { isSupervisorRole: true },
      //     through: { attributes: [] }
      //   }]
      // })
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
      console.log(error);
      res.status(500).json(error);
    }
  },

  getRolesDropdown: async (req, res) => {
    try {
      const roles = await Role
        .query()
        .select('id', 'name')
        .where('companyId', req.principal.companyId)

      // const roles = await Role.findAll({ where: { companyId: req.principal.companyId }, attributes: ['id', 'name'] })
      res.status(200).json(roles);
    }
    catch (error) {
      console.log(error);
      res.status(500).json(error);
    }

  }


}; //end
