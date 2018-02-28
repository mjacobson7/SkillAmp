const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

module.exports = (app) => {
  app.put('/updateUser', authController.verifyValidToken, userController.updateUser);

  app.get('/getMyProfile', authController.verifyValidToken, userController.getMyProfile);

  app.get('/getAllUsers', authController.verifyValidToken, userController.getAllUsers);

  app.get('/getSupervisorTeam', authController.verifyValidToken, userController.getSupervisorTeam);

  app.get('/getSupervisors', authController.verifyValidToken, userController.getSupervisors);
};
