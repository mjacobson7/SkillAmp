// var User = require('./api/models/user').User;
// var BlogPost = require('./api/models/blogPost');
// var GlobalSetting = require('./api/models/globalSetting');
var authController = require('../features/auth/authController');
var session = require('express-session');
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var port = 4700;

//Express
var app = express();
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
    
//Sessions
app.use(session({
    key: 'user_sid',
    secret: 'somerandonstuffs', //Change this and move it to the secrets file
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
        
// middleware function to check for logged-in users
var sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        console.log("already logged in");
    } else {
        next();
    }    
};

//routes
// require('../features/auth/authController')(app); //Add user model
require('../features/auth/authRoutes')(app, sessionChecker, authController);

//Set up static files
app.use(express.static('build'));

//Listening to port
app.listen(process.env.PORT || port, () => {
console.log(`Now listening on port ${port}`);
});