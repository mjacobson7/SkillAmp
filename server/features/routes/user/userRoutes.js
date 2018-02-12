const userController = require('./userController'),
      authController = require('../auth/authController');

module.exports = (app) => {

    app.put('/updateUser', authController.verifyValidToken, userController.updateUser);
    

}