const surveyController = require('../controllers/surveyController');
const authController = require('../controllers/authController');

module.exports = (app) => {

  app.post('/addSurvey', /*Do some auth check here*/ surveyController.addSurveys);

  app.get('/getMySurveyScore', authController.verifyValidToken, surveyController.getMySurveyScore);

  app.get('/getTeamSurveyScore', authController.verifyValidToken, surveyController.getTeamSurveyScore);

  app.get('/getAllSurveyScore', authController.verifyValidToken, surveyController.getAllSurveyScore);

  app.post('/getMySurveysPage', authController.verifyValidToken, surveyController.getMySurveysPage);

  app.post('/getTeamSurveysPage', authController.verifyValidToken, authController.hasPermission('CAN_SUPERVISE'), surveyController.getTeamSurveysPage);

  app.post('/getAllSurveysPage', authController.verifyValidToken, authController.hasPermission('CAN_ADMIN'), surveyController.getAllSurveysPage);

};
