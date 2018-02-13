const userController = require('./userController'),
      authController = require('../auth/authController');

module.exports = (app) => {

    app.put('/updateUser', authController.verifyValidToken, userController.updateUser);

    app.get('/getUser', authController.verifyValidToken, userController.getUser);


};
