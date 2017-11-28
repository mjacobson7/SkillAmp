const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();
const session = require('express-session');
var cookieParser = require('cookie-parser');
var secrets = require('./config/secrets');
var User = require('./features/users/userModel');
var sessionChecker = require('./config/sessions');


// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));

//Set up static files
app.use(express.static('dist'));

//Sessions
app.use(session({
    key: 'user_sid',
    secret: secrets.sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
    expires: 600000
    }
}));
        
// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');        
    }
    next();
});

//Set Port
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));

//routes 
require('./config/sessions')(app);
require('./features/auth/authRoutes')(app, sessionChecker, User);

/////////////////////////////////EXPRESS APP ABOVE/////////////////////////////////

/////////////////////////////////AUTH ROUTES BELOW/////////////////////////////////

// app.post('/login', sessionChecker, (req, res) => {
//     var username = req.body.username,
//     password = req.body.password;
//     User.findOne({ where: { username: username } }).then(function (user) {
//         if (!user) {
//             res.status(200).json("Can't find that user");
//         } else if (!user.validPassword(password)) {
//             res.status(200).json("Password is not valid");
//         } else {
//             req.session.user = user.dataValues;
//             res.status(200).json("You've reached the dashboard page");
//         }
//     });
// });

// app.get('/logout', (req, res) => {
//     if (req.session.user && req.cookies.user_sid) {
//         res.clearCookie('user_sid');
//         res.status(200).send("You've been logged out");
//     } else {
//         res.status(200).send("You've reached the login page");
//     }
// });

// app.post('/createUser', (req, res, next) => {
//     User.create({
//         username: req.body.username,
//         email: req.body.email,
//         password: req.body.password
//     }) 
//     .then(user => {
//         req.session.user = user.dataValues;
//         res.status(200).json("You have successfully created a new account!");
//     })
//     .catch(error => {
//         res.status(401).json("There was an unexpected error");
//     });
// })


/////////////////////////////////AUTH ROUTES ABOVE/////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////DATABASE CONFIG BELOW/////////////////////////////

//can i remove this????

var Sequelize = require('sequelize');
// var secrets = require('./secrets');
var sequelize = new Sequelize('postgres://postgres@localhost:5432/firstImpression', {
    operatorsAliases: false
});

module.exports.database = sequelize;

/////////////////////////////////DATABASE CONFIG ABOVE/////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////