const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();
const cookieParser = require('cookie-parser');
const secrets = require('./config/secrets');

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cookieParser());


// Angular DIST output folder
app.use(express.static(path.join(__dirname, '../dist')));

//Set up static files
app.use(express.static('../dist'));

// Send all other requests to the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

//Create Server
const port = process.env.PORT || '3000';
app.set('port', port);
const server = http.createServer(app);
server.listen(port, () => console.log(`Running on localhost:${port}`));

// used to create, sign, and verify tokens
var jwt = require('jsonwebtoken'); 

//routes 
require('./routes/auth/authRoutes')(app);







