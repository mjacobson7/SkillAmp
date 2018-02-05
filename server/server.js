const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();
const cookieParser = require('cookie-parser');
const secrets = require('./config/secrets');
const User = require('./features/users/userModel');

// const massive = require('massive');
// const connectionString = secrets.development;

var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens

// massive(connectionString).then(db => {
//      app.set('db', db);
//      db.get_users().then(tables => {
//          console.log(tables);
//      })
//     });

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());

// Angular DIST output folder
app.use(express.static(path.join(__dirname, '../dist')));

//Set up static files
app.use(express.static('../dist'));

// Send all other requests to the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});
        

//Set Port
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));

//routes 
require('./features/auth/authRoutes')(app, User);
require('./config/database')(app);