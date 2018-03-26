const authController = require('../controllers/authController');
const companyController = require('../controllers/companyController');

module.exports = (app) => {
  app.post('/createCompany', /* Eventually we need to put some verification here, */ companyController.createCompany);
};
