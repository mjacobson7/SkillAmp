const navController = require('../controllers/navController');
const authController = require('../controllers/authController');

module.exports = (app) => {
    app.get('/sideNavList', authController.verifyValidToken, navController.getSideNavList);
}