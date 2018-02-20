const feedbackController = require('../controllers/feedbackController');
const authController = require('../controllers/authController');

module.exports = (app) => {

  app.post('/addFeedback', /* Eventually we need to put some verification here, */ feedbackController.addFeedback);

  app.get('/getMyFeedback', authController.verifyValidToken, feedbackController.getMyFeedback);

  app.get('/getTeamFeedback', authController.verifyValidToken, feedbackController.getTeamFeedback);

};
