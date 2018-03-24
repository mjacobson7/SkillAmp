const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets');
const User = require('../models/index').user;
const Company = require('../models/index').company;
const Role = require('../models/index').role;
const UserRole = require('../models/index').userRole;
const bcrypt = require('bcrypt');

module.exports = {

  login: async (req, res) => {
    const dbInstance = req.app.get('db');
    const { hostname, username, password } = req.body;

    try {
    const company = await dbInstance.find_company_by_hostname([hostname]);
    const user = await dbInstance.get_user_by_username([username, company[0].id]);
    if(typeof user[0].supervisorId !== 'undefined' && user[0].supervisorId) {
      const supervisor = await dbInstance.get_supervisor([user[0].supervisorId]);      
    }
    const roles = await dbInstance.get_user_roles([company[0].id, user[0].id]);
    
    
      if (bcrypt.compareSync(password, user[0].password)) {
        let token = jwt.sign({ userId: user[0].id, companyId: user[0].companyId }, secrets.tokenSecret, { expiresIn: '1h' });
        if (roles.length > 0) {
          user[0].roles = roles;
        }
        if (typeof user[0].supervisorId !== 'undefined' && user[0].supervisorId) {
          user[0].supervisor = supervisor[0];
          res.status(200).json({ token: token, user: user[0] });
        } else {
          res.status(200).json({ token: token, user: user[0] });
        }
      }
    }
    catch(error) {
      console.log(error);
      res.status(500).json(error);
    }

  },

  createUser: async (req, res) => {
    const dbInstance = req.app.get('db');
    let { username, firstName, lastName, password, email, supervisorId, companyId } = req.body;
    const salt = bcrypt.genSaltSync();
    password = bcrypt.hashSync(password, salt);

    try {
      const newUser = await dbInstance.create_user([companyId, username, firstName, lastName, email, password, supervisorId]);
    }
    catch (error) {
      res.status(500).json(error);
    }

  },

  verifyValidToken: (req, res, next) => {
    const dbInstance = req.app.get('db');
    jwt.verify(req.header('auth'), secrets.tokenSecret, function (err, decoded) {
      if (decoded) {
        dbInstance.get_user_by_id([decoded.userId, decoded.companyId]).then((user) => {
          req.principal = user[0];
          next();
        })
      } else {
        res.status(401).json(err);
      }
    })
  }
};