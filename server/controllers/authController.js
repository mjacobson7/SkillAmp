const jwt     = require('jsonwebtoken');
const secrets = require('../config/secrets');
const User    = require('../models/index').user;
const Company = require('../models/index').company;

module.exports = {

  login: (req, res) => {
    Company.findOne({ where: { hostname: req.body.hostname } }).then((company) => {
      User.findOne({ where: { username: req.body.username, companyId: company.dataValues.id } }).then(user => {
        if (user) {
          if(user.validPassword(req.body.password)) {
            let token = jwt.sign({userId: user.id, companyId: company.dataValues.id}, secrets.tokenSecret, {expiresIn: '1h'});
            res.status(200).json({
              token: token,
              user: user
            });
          } else {
            res.status(200).json("Invalid username and/or password.");
          }
        } else {
          res.status(200).json("Could not find that user.");
        }
      });
    });
  },

  createUser: (req, res) => {
    User.create({
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
      email: req.body.email,
      supervisorId: req.body.supervisorId,
      companyId: req.body.companyId
      // role: req.body.role
    })
      .then(() => {
        res.status(200).json("You have successfully created a new account!");
      })
      .catch(error => {
        console.log(error);
        res.status(401).json(error);
      });
  },

  verifyValidToken: (req, res, next) => {
    jwt.verify(req.header('auth'), secrets.tokenSecret, function(err, decoded) {
      if(decoded) {
        req.auth = decoded;
        next();
      } else {
        res.status(401).json(err);
      }
    })
  }
};
