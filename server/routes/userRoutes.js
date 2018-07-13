const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

module.exports = (app) => {
  app.put('/updateUser', authController.verifyValidToken, authController.hasPermission('CAN_EDIT_USERS'), userController.updateUser);

  app.get('/getCurrentUser', authController.verifyValidToken, userController.getCurrentUser);

  app.post('/getUsersPage', authController.verifyValidToken, authController.hasPermission('CAN_ADMIN'), userController.getUsersPage);

  app.post('/getTeamPage', authController.verifyValidToken, authController.hasPermission('CAN_SUPERVISE'), userController.getTeamPage);

  app.get('/getSupervisorDropdown', authController.verifyValidToken, userController.getSupervisorDropdown);

  app.get('/getRolesDropdown', authController.verifyValidToken, userController.getRolesDropdown);

  app.get('/getUser/:id', authController.verifyValidToken, authController.hasPermission('CAN_EDIT_USERS'), userController.getUser);

  app.post('/createUser', authController.verifyValidToken, authController.hasPermission('CAN_CREATE_USERS'), userController.createUser);

  app.delete('/deleteUser/:id', authController.verifyValidToken, authController.hasPermission('CAN_DELETE_USERS'), userController.deleteUser)

  app.get('/defaultUserRole', authController.verifyValidToken, userController.defaultUserRole);
};
