const dashboardController = require('../controllers/dashboardController');
const authController = require('../controllers/authController');

module.exports = (app) => {
    app.get('/getAdminWidgets', authController.verifyValidToken, authController.hasPermission('CAN_ADMIN'), dashboardController.getAdminWidgets);
    app.get('/getSupervisorWidgets', authController.verifyValidToken, authController.hasPermission('CAN_SUPERVISE'), dashboardController.getSupervisorWidgets);
    app.get('/getAgentWidgets', authController.verifyValidToken, dashboardController.getAgentWidgets);

    app.post('/teamLeaderboard', authController.verifyValidToken, dashboardController.getTeamLeaderboard);
    app.post('/surveyChartData', authController.verifyValidToken, dashboardController.getSurveyChartData);
}