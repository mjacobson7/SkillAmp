const dashboardController = require('../controllers/dashboardController');
const authController = require('../controllers/authController');

module.exports = (app) => {
    app.get('/getUserWidgetData', authController.verifyValidToken, dashboardController.getUserWidgetData);
    app.post('/team_leaderboard', authController.verifyValidToken, dashboardController.getTeamLeaderboard);
}