const authController = require('../controllers/authController');

module.exports = (app) => {

  app.post('/userAuth', authController.login);
  app.get('/userPermissions', authController.verifyValidToken, authController.userPermissions);
  // app.post('/createUser', authController.createUser);
};