const app     = require('../../server');
const jwt     = require('jsonwebtoken');
const secrets = require('../../config/secrets');
const bcrypt  = require('bcrypt');
const User    = require('../../config/models/User');
const Feedback = require('../../config/models/Feedback');


module.exports = {

    login: (req, res) => {
        User.findOne({ where: { username: req.body.username } }).then(user => {
            if (user) {
                if(user.validPassword(req.body.password)) {
                    var token = jwt.sign({user}, secrets.tokenSecret, {expiresIn: '1h'});
                    res.status(200).json({
                        token: token
                    })
                } else {
                    res.status(200).json("Invalid username and/or password.");
                }
            } else {
                res.status(200).json("Could not find that user.");
            }
        });
    },

    createUser: (req, res, next) => {
        User.create({
            username: req.body.username,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            supervisor: req.body.supervisor,
            role: req.body.role,
            password: req.body.password
        }) 
        .then(user => {
            res.status(200).json("You have successfully created a new account!");
        })
        .catch(error => {
            res.status(401).json(error);
        });
    }
}