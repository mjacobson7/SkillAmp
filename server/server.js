const app = require('./config/express')();
const http = require('http');
const jwt = require('jsonwebtoken');
const port = process.env.PORT || '3000';

//routes
require('./features/routes/auth/authRoutes')(app);

//Create Server
app.set('port', port);
const server = http.createServer(app);
server.listen(port, () => console.log(`Running on localhost:${port}`));










