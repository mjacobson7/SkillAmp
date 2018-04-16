const authController = require('../controllers/authController');

module.exports = (app) => {

  app.post('/userAuth', authController.login);

  // app.post('/createUser', authController.createUser);
};
