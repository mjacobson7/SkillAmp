const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();
const cookieParser = require('cookie-parser');
const secrets = require('./config/secrets');
const massive = require('massive');

//Connect to database
massive(secrets.development).then(db => {
    app.set('db', db);
});


// used to create, sign, and verify tokens
var jwt = require('jsonwebtoken'); 

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
require('./features/auth/authRoutes')(app);




