const app = require('./config/express')(),
      http = require('http'),
      jwt = require('jsonwebtoken'),
      port = process.env.PORT || '3000';

require('./features/routes/auth/authRoutes')(app);
require('./features/routes/user/userRoutes')(app);

//Create Server
app.set('port', port);
const server = http.createServer(app);
server.listen(port, () => console.log(`Running on localhost:${port}`));









