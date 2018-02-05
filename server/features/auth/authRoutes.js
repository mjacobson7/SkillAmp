var authController = require('./authController');

module.exports = (app) => {

    app.post('/user-auth', authController.login);
        
    app.post('/createUser', authController.createUser);

}