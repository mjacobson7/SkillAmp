const surveyController = require('../controllers/surveyController');
const authController = require('../controllers/authController');

module.exports = (app) => {

  app.post('/addSurvey', /*Do some auth check here*/ surveyController.addSurveys);

  app.post('/getMySurveys', authController.verifyValidToken, surveyController.getMySurveys);

  app.get('/getMySurveyScore', authController.verifyValidToken, surveyController.getMySurveyScore);

  app.get('/getTeamSurveys', authController.verifyValidToken, authController.hasPermission('CAN_SUPERVISE'), surveyController.getTeamSurveys);

};
