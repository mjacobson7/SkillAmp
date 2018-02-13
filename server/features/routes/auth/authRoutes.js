const authController = require('./authController');

module.exports = (app) => {

    app.post('/userAuth', authController.login);

    app.post('/createUser', authController.createUser);

};
