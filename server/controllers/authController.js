const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const ErrorDebugInfo = require('../models/schema').ErrorDebugInfo;

const userService = require('../services/userService');
const companyService = require('../services/companyService');
const rolesService = require('../services/rolesService');

module.exports = {

  login: async (req, res) => {
    try {
      const { username, password } = req.body;

      const company = await companyService.getCompanyByHostname(req.hostname);
      const user = await userService.getUserByUsername(username, company.id);

      if (user) {
        const userRoles = await rolesService.getUserRoles(user.id, user.companyId)

        if (userRoles.length > 0) {
          let userPermissions = [];
          for (let role of userRoles) {
            let permissions = await rolesService.getPermissionsByRoleId(role.roleId, user.companyId);
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

          if (bcrypt.compareSync(password, user.password)) {
            let token = jwt.sign({ userId: user.id, companyId: user.companyId }, process.env.TOKEN_SECRET, { expiresIn: '24h' });
            res.status(200).json({ token: token, user: user, permissions: permissionsMap });
          } else {
            return res.status(403).json();
          }
        } else {
          return res.status(403).json();
        }
      } else {
        return res.status(403).json();
      }
    }
    catch (error) {
      console.trace(error.stack);
      res.status(500).json(error.stack);
    }
  },

  userPermissions: async (req, res) => {
    try {
      const userRoles = await rolesService.getUserRoles(req.principal.id, req.principal.companyId);

      let userPermissions = [];
      for (let role of userRoles) {
        let permissions = await rolesService.getPermissionsByRoleId(role.roleId, req.principal.companyId);

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
      console.trace(error.stack);
      res.status(500).json(error.stack);
    }
  },

  verifyValidToken: async (req, res, next) => {
    try {
      let decoded = await jwt.verify(req.header('auth'), process.env.TOKEN_SECRET);
      if (decoded) {
        req.principal = await userService.getUserById(decoded.userId, decoded.companyId);
        next();
      } else {
        res.status(403).json("Session has expired");
      }
    }
    catch (error) {
      console.trace(error.stack);
      res.status(500).json(error.stack);
    }
  },

  hasPermission: (permissionName) => {
    return async (req, res, next) => {
      try {
        const permission = await rolesService.getPermissionByPermissionName(permissionName, req.principal.companyId);
        const principalRoles = await rolesService.getUserRoles(req.principal.id, req.principal.companyId);

        if (permission != null) {
          for (let i = 0; i < principalRoles.length; i++) {
            if (permission.roleId === principalRoles[i].roleId) {
              return next();
            }
          }
        }
        res.status(403).json();
      }
      catch (error) {
        console.trace(error.stack);
        res.status(500).json(error.stack);
      }
    }
  },

  logError: async (req, res) => {
    let { user, error } = req.body;

    let uuid = '', i, random;
    for (i = 0; i < 32; i++) {
      random = Math.random() * 16 | 0;
      if (i == 8 || i == 12 || i == 16 || i == 20) { uuid += "-" }
      uuid += (i == 12 ? 4 : (i == 16 ? (random & 3 | 8) : random)).toString(16);
    }
    
    //service for this or nah?
    const errorStack = await ErrorDebugInfo
      .query()
      .insert({ id: uuid, status: error.status, error: error.error, request: error.url, username: user.username, companyId: user.companyId })
      .returning('*')

    res.status(200).json(errorStack);
  }
};