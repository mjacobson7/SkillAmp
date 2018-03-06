const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

module.exports = (app) => {
  app.put('/updateUser', authController.verifyValidToken, userController.updateUser);

  app.get('/getCurrentUser', authController.verifyValidToken, userController.getCurrentUser);

  app.get('/getAllUsers', authController.verifyValidToken, userController.getAllUsers);

  app.get('/getSupervisorTeam', authController.verifyValidToken, userController.getSupervisorTeam);

  app.get('/getSupervisors', authController.verifyValidToken, userController.getSupervisors);

  app.get('/getUserRoles', authController.verifyValidToken, userController.getUserRoles);
};
