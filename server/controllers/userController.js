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
                where: { id: req.auth.user.id }}).then(() => {
                    User.findById(req.auth.user.id).then((user) => {
                        res.status(200).json(user.dataValues);
                    })
            })
    },

    getUser: (req, res) => {
      User.findById(req.auth.user.id).then((user) => {
        res.status(200).json(user);
      })
    }


};
