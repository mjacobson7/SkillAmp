const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Company = require('../models/index').Company;
const User = require('../models/index').User;
const UserRole = require('../models/index').UserRole;
const Role = require('../models/index').Role;

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
          include: [{
            model: Role,
            as: 'roles',
            through: { attributes: [] }
          }]
          //include supervisor????
        })
        if (bcrypt.compareSync(password, user.password)) {
          let token = jwt.sign({ userId: user.id, companyId: user.companyId }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
          res.status(200).json({ token: token, user: user });
        }
      }
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

  verifyValidToken: (req, res, next) => {
    jwt.verify(req.header('auth'), process.env.TOKEN_SECRET, async (error, decoded) => {
      try {
        if (decoded) {
          req.principal = await User.findOne({ where: { id: decoded.userId, companyId: decoded.companyId } })
          next();
        } else {
          res.status(401).json(error);
        }
      }
      catch (error) {
        console.log(error);
        res.status(500).json(error);
      }
    })



  }
};