const express = require('express'),
      app = express(),
      path = require('path'),
      bodyParser = require('body-parser'),
      cookieParser = require('cookie-parser'),
      cors = require('cors'),
      massive = require('massive'),
      secrets = require('./config/secrets'),
      http = require('http');
      require('dotenv').config(),

// Connect to Database
massive( process.env.DATABASE_URL ||  secrets.localDb ).then( dbInstance => app.set('db', dbInstance) );

//Express Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cookieParser());

//Routes
require('./routes/authRoutes')(app);
require('./routes/userRoutes')(app);
require('./routes/feedbackRoutes')(app);
require('./routes/companyRoutes')(app);

// Angular DIST output folder
app.use(express.static(path.join(__dirname, '/../dist')));

// Send all other requests to the Angular app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../dist/index.html'));
});

// Set Port & Create Server
const port = process.env.PORT || 3000;
app.set('port', port);
const server = http.createServer(app);

// Listen to port
server.listen(port, () => {console.log(`Server listening on port ${port}`)});

// module.exports = app;









