var authController = require('./authController');

module.exports = (app, sessionChecker, User) => {

    app.post('/login', sessionChecker, authController.login);
    
    app.get('/logout', authController.logout);
    
    app.post('/createUser', authController.createUser)
}