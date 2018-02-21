const Company = require('../models/index').company;

module.exports = {
  createCompany: (req, res) => {
    Company.create({
      name: req.body.name,
      hostname: req.body.hostname
    }).then(() => {
      res.status(200).json("Company was created")
    }).catch((error) => {
      res.status(401).json(error);
    })
  }
};
