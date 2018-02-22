const User = require('../models/index').user;

module.exports = {

    updateUser: (req, res) => {
            User.update({
                username: req.body.username,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                // password: req.body.password,
                email: req.body.email,
                supervisor: req.body.supervisor,
                role: req.body.role
            },
            {
                where: { id: req.auth.userId, companyId: req.auth.companyId }}).then(() => {
                    User.findById(req.auth.userId).then((user) => {
                        res.status(200).json(user.dataValues);
                    })
            })
    },

    getUser: (req, res) => {
      User.findOne({ where: { id: req.auth.userId, companyId: req.auth.companyId } }).then((user) => {
        res.status(200).json(user);
      });
    },

    getAllUsers: (req, res) => {
      User.find({ where: { companyId: req.auth.companyId }}).then((users) => {
        res.status(200).json(users);
      })
    },

    getSupervisorTeam: (req, res) => {
      User.find({ where: { supervisorId: req.auth.userId, companyId: req.auth.companyId }}).then((users) => {
        res.status(200).json(users);
      })
    }


};
