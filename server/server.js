const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();
const cookieParser = require('cookie-parser');
const secrets = require('./config/secrets');
const massive = require('massive');

// used to create, sign, and verify tokens
var jwt    = require('jsonwebtoken'); 

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());

//Connect to database
let connectionString = secrets.development;
massive(connectionString).then(db => {
    app.set('db', db);
});


//routes 
require('./features/auth/authRoutes')(app);

app.post('/user-auth', function(req, res) {
    req.app.get('db').get_user(req.body.username).then(user => {
        res.status(200).json("You did it!");
    })
})

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

module.exports = app;


