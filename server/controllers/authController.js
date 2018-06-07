const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Company = require('../models/index').company;
const User = require('../models/index').user;
const UserRole = require('../models/index').userRole;
const Role = require('../models/index').role;
const Permission = require('../models/index').permission;
const RolePermission = require('../models/index').rolePermission;

module.exports = {

  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      const company = await Company.findOne({
        where: { hostname: req.hostname }
      })
      if (company) {
        const user = await User.findOne({
          where: { username: username, companyId: company.id },
          include: [
            { model: Role, as: 'roles', include: [{ model: Permission, as: 'permissions' }] }
          ]
          //include supervisor????
        })

        let userRoles = await UserRole.findAll({
          where: { companyId: user.companyId, userId: user.id },
          attributes: ['roleId']
        })

        let userPermissions = [];
        for (let role of userRoles) {
          let permissions = await RolePermission.findAll({
            where: { companyId: user.companyId, roleId: role.roleId },
            attributes: ['permissionName']
          })
          if (permissions.length > 0) {
            permissions.forEach(permission => {
              userPermissions.push(permission.permissionName);
            })
          }
        }

        let permissionsMap = {};

        userPermissions.forEach(currPermission => {
          if (userPermissions.includes(currPermission)) {
            permissionsMap[currPermission] = true;
          }
        });

        if (!user) {
          res.status(401).json("Unable to login");
        } else {
          if (bcrypt.compareSync(password, user.password)) {
            let token = jwt.sign({ userId: user.id, companyId: user.companyId }, process.env.TOKEN_SECRET, { expiresIn: '24h' });
            res.status(200).json({ token: token, user: user, permissions: permissionsMap });
          } else {
            res.status(401).json("Unable to login");
          }
        }
      } else {
        res.status(401).json("Unable to login");
      }
    }
    catch (error) {
      console.log(error);
      res.status(500).json(error);
    }

  },

  userPermissions: async (req, res) => {
    try {
      let userRoles = await UserRole.findAll({
        where: { companyId: req.principal.companyId, userId: req.principal.id },
        attributes: ['roleId']
      })

      let userPermissions = [];
      for (let role of userRoles) {
        let permissions = await RolePermission.findAll({
          where: { companyId: req.principal.companyId, roleId: role.roleId },
          attributes: ['permissionName']
        })
        if (permissions.length > 0) {
          permissions.forEach(permission => {
            userPermissions.push(permission.permissionName);
          })
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
        req.principal = await User.findOne({
          where: { id: decoded.userId, companyId: decoded.companyId },
          include: [{
            model: Role,
            as: 'roles',
            through: { attributes: [] }
          }]
        })
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
        let permission = await RolePermission.findOne({
          where: { permissionName: permissionName, companyId: req.principal.companyId },
          include: [{
            model: Role,
            as: 'roles',
            attributes: ['id']
          }],
          attributes: []
        })

        let principalRoles = await UserRole.findAll({
          where: { userId: req.principal.id, companyId: req.principal.companyId },
          attributes: ['roleId']
        })

        for (role of principalRoles) {
          if (role.roleId === permission.roles.id) {
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