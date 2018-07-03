const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const Company = require('../models/schema').Company;
const User = require('../models/schema').User;
const UserRole = require('../models/schema').UserRole;
const RolePermission = require('../models/schema').RolePermission;


module.exports = {

  login: async (req, res) => {
    try {
      const { username, password } = req.body;

      const company = await Company
        .query()
        .where('hostname', req.hostname);

      const user = await User
        .query()
        .eager('[roles, supervisor]')
        .where('username', username)
        .andWhere('users.companyId', company[0].id)

      if (user) {
        const userRoles = await UserRole
          .query()
          .select('roleId')
          .where('companyId', user[0].companyId)
          .andWhere('userId', user[0].id)

        let userPermissions = [];
        for (let role of userRoles) {
          const permissions = await RolePermission
            .query()
            .select('permissionName')
            .where('companyId', user[0].companyId)
            .andWhere('roleId', role.roleId)

          if (permissions.length > 0) {
            for (let permission of permissions) {
              userPermissions.push(permission.permissionName);
            }
          }
        }

        let permissionsMap = {};
        for (let currPermission of userPermissions) {
          permissionsMap[currPermission] = true;
        }

        //the above code should do the same as this. Figure that out before we remove this code below
        // userPermissions.forEach(currPermission => {
        //   if (userPermissions.includes(currPermission)) {
        //     permissionsMap[currPermission] = true;
        //   }
        // });

        if (bcrypt.compareSync(password, user[0].password)) {
          let token = jwt.sign({ userId: user[0].id, companyId: user[0].companyId }, process.env.TOKEN_SECRET, { expiresIn: '24h' });
          res.status(200).json({ token: token, user: user[0], permissions: permissionsMap });
        } else {
          res.status(403).json("The username or password you have entered is invalid.");
        }

      } else {
        res.status(403).json("The username or password you have entered is invalid.");
      }
    }
    catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  userPermissions: async (req, res) => {
    try {
      const userRoles = await UserRole
        .query()
        .select('roleId')
        .where('companyId', req.principal.companyId)
        .andWhere('userId', req.principal.id)

      let userPermissions = [];
      for (let role of userRoles) {
        const permissions = await RolePermission
          .query()
          .select('permissionName')
          .where('companyId', req.principal.companyId)
          .andWhere('roleId', role.roleId)

        if (permissions.length > 0) {
          for (let permission of permissions) {
            userPermissions.push(permission.permissionName);
          }
        }
      }

      let permissionsMap = {};

      userPermissions.forEach(currPermission => {
        if (userPermissions.includes(currPermission)) {
          permissionsMap[currPermission] = true;
        }
      });

      res.status(200).json(permissionsMap);
    }
    catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  // createUser: async (req, res) => {
  //   const dbInstance = req.app.get('db');
  //   let { username, firstName, lastName, password, email, supervisorId, companyId } = req.body;
  //   const salt = bcrypt.genSaltSync();
  //   password = bcrypt.hashSync(password, salt);

  //   try {
  //     const newUser = await dbInstance.create_user([companyId, username, firstName, lastName, email, password, supervisorId]);
  //   }
  //   catch (error) {
  //     res.status(500).json(error);
  //   }

  // },

  verifyValidToken: async (req, res, next) => {
    try {
      let decoded = await jwt.verify(req.header('auth'), process.env.TOKEN_SECRET);
      if (decoded) {
        const user = await User
          .query()
          .where('id', decoded.userId)
          .andWhere('companyId', decoded.companyId)
          .eager('roles')

        req.principal = user[0]

        next();
      } else {
        res.status(401).json("Token Expired");
      }
    }
    catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  hasPermission: (permissionName) => {
    return async (req, res, next) => {
      try {
        const permission = await RolePermission
          .query()
          .eager('roles')
          .where('permissionName', permissionName)
          .andWhere('companyId', req.principal.companyId)

        const principalRoles = await UserRole
          .query()
          .select('roleId')
          .where('userId', req.principal.id)
          .andWhere('companyId', req.principal.companyId)

        for (role of principalRoles) {
          if (role.roleId === permission[0].roles.id) {
            return next();
          } else {
            continue;
          }
        }
        res.status(403).send();
      }

      catch (error) {
        console.log(error);
        res.status(500).json(error);
      }
    }
  }
};