const feedbackController = require('../controllers/feedbackController');
const authController = require('../controllers/authController');

module.exports = (app) => {

  app.post('/addFeedback', authController.verifyValidToken,feedbackController.addFeedback);

  app.post('/getMyFeedback', authController.verifyValidToken, feedbackController.getMyFeedback);

  app.get('/getMyFeedbackScore', authController.verifyValidToken, feedbackController.getMyFeedbackScore);

  app.get('/getTeamFeedback', authController.verifyValidToken, feedbackController.getTeamFeedback);

};
