const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const secrets = require('./config/secrets');
const User = require('./features/users/userModel');
const sessionChecker = require('./config/sessions');


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
require('./config/sessions');
require('./features/auth/authRoutes')(app, User);