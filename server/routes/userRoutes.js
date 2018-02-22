const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

module.exports = (app) => {
  app.put('/updateUser', authController.verifyValidToken, userController.updateUser);

  app.get('/getUser', authController.verifyValidToken, userController.getUser);

  app.get('/getAllUsers', authController.verifyValidToken, userController.getAllUsers);

  app.get('/getSupervisorTeam', authController.verifyValidToken, userController.getSupervisorTeam);
};
