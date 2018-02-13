const express = require('express'),
      app = express(),
      http = require('http'),
      port = process.env.PORT || '3000',
      path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

//Express Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cookieParser());

//Routes
require('./features/routes/auth/authRoutes')(app);
require('./features/routes/user/userRoutes')(app);

// Angular DIST output folder
app.use(express.static(path.join(__dirname, '/../dist')));

// Send all other requests to the Angular app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../dist/index.html'));
});

//Create Server
app.set('port', port);
const server = http.createServer(app);
server.listen(port, () => console.log(`Running on localhost:${port}`));









