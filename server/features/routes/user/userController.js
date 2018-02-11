const User = require('../../models/User'),
      secrets = require('../../../config/secrets'),
      jwt = require('jsonwebtoken');

module.exports = {

    updateUser: (req, res) => {
        jwt.verify(req.header('auth'), secrets.tokenSecret, function(err, decoded) {
            console.log(decoded.user.id) // bar

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
                where: { id: decoded.user.id }}).then((response) => {
                    res.status(200).json(response);
            })
        });
          
    }
}