var authController = require('./authController');
var sessions = require('../../config/sessions');

module.exports = (app, sessionChecker, User) => {

    app.post('/user-auth', sessions.sessionChecker, authController.login);
    
    app.get('/user-auth', authController.logout);
    
    app.post('/createUser', authController.createUser)
}