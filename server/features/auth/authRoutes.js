var authController = require('./authController');

module.exports = (app, User) => {

    app.post('/user-auth', authController.login);
        
    app.post('/createUser', authController.createUser);

}