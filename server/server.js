const express = require('express'),
      app = express(),
      path = require('path'),
      bodyParser = require('body-parser'),
      cookieParser = require('cookie-parser');

//Express Middleware
app.use(bodyParser.json());
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

module.exports = app;









