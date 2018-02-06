const app     = require('../../server');
const jwt     = require('jsonwebtoken');
const secrets = require('../../config/secrets');
const bcrypt  = require('bcrypt');
const User = require('../users/userModel');


module.exports = {
    login: (req, res) => {
        // req.app.get('db').get_user(req.body.username).then(function(user) {
        //     if(user[0]) {
        //         bcrypt.compare(req.body.password, user[0].password, function(err, result) {
        //             if(result) {
  
        //             } else {
        //                 res.status(200).json("Invalid username and/or password.");
        //             }
        //         });
        //     } else {
        //         res.status(200).json("Could not find that user.");
        //     }
        // })


            var username = req.body.username,
            password = req.body.password;
            User.findOne({ where: { username: username } }).then(function (user) {
                if (user) {
                    if(user.validPassword(password)) {
                        var token = jwt.sign({user}, secrets.tokenSecret, {expiresIn: '1h'});
                        res.status(200).json({
                            token: token,
                            user: user
                        })
                    } else {
                        res.status(200).json("Invalid username and/or password.");
                    }
                } else {
                    res.status(200).json("Could not find that user.");
                }
                
                // else if (!user.validPassword(password)) {
                //     res.status(200).json("Password is not valid");
                // } else {
                //     res.status(200).json("You've reached the dashboard page");
                // }
            });
        




    },

    createUser: (req, res, next) => {
        console.log(req.body);
        // User.create({
        //     username: req.body.username,
        //     firstName: req.body.firstName,
        //     lastName: req.body.lastName,
        //     email: req.body.email,
        //     password: req.body.password
        // }) 
        // .then(user => {
        //     res.status(200).json("You have successfully created a new account!");
        // })
        // .catch(error => {
        //     res.status(401).json("There was an unexpected error");
        // });
    }
}