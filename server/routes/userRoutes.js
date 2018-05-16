const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

module.exports = (app) => {
  app.put('/updateUser', authController.verifyValidToken, userController.updateUser);

  app.get('/getCurrentUser', authController.verifyValidToken, userController.getCurrentUser);

  app.get('/getAllUsers', authController.verifyValidToken, authController.hasPermission('CAN_VIEW_MANAGE_USERS_SUB_NAV'), userController.getAllUsers);

  app.get('/getMyTeam', authController.verifyValidToken, userController.getMyTeam);

  app.get('/getSupervisorDropdown', authController.verifyValidToken, userController.getSupervisorDropdown);

  app.get('/getRolesDropdown', authController.verifyValidToken, userController.getRolesDropdown);

  app.get('/getUser/:id', authController.verifyValidToken, userController.getUser);

  app.post('/createUser', authController.verifyValidToken, authController.hasPermission('CAN_CREATE_USERS'), userController.createUser);
};
