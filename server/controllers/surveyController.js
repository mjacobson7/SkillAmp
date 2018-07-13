const Survey = require('../models/schema').Survey;
const authController = require('../controllers/authController');

const surveyService = require('../services/surveyService');

module.exports = {

  addSurveys: async (req, res) => {
    try {
      await surveyService.createSurvey(req.body);
      res.status(200).json("Survey Created!");
    }
    catch (error) {
      console.trace(error.stack);
      res.status(500).json(error.stack);
    }
  },

  getMySurveys: async (req, res) => {
    try {
      const { pageIndex, pageSize, ratingSort, dateSort } = req.body.params;

      const surveyCount = await surveyService.getAgentSurveyPageCount(req.principal.id, ratingSort, req.principal.companyId);

      let offset = (pageIndex) * pageSize;

      const mySurveys = await surveyService.getAgentSurveyPage(req.principal.id, ratingSort, dateSort, offset, pageSize, req.principal.companyId);

      const mySurveyPage = {
        content: mySurveys,
        length: surveyCount.count
      }
      res.status(200).json(mySurveyPage);
    }
    catch (error) {
      console.trace(error.stack);
      res.status(500).json(error.stack);
    }
  },

  getMySurveyScore: async (req, res) => {
    try {
      const averageScore = await surveyService.getAverageAgentScore(req.principal.id, req.principal.companyId);
      const surveyCount = await surveyService.getAgentSurveysCount(req.principal.id, req.principal.companyId);

      !averageScore.avg ? averageScore.avg = 0 : '';

      let totalPercentages = [];
      let ratingQueryCount = 1;

      for (let i = 0; i < 5; i++) {
        let ratingAverage = await surveyService.getSurveyCountByRating(req.principal.id, ratingQueryCount, req.principal.companyId);
        if (ratingAverage.sum > 0) {
          totalPercentages.unshift({ score: ratingQueryCount, percentage: (ratingAverage.sum / ratingQueryCount) / surveyCount.count })
        } else {
          totalPercentages.unshift({ score: ratingQueryCount, percentage: 0 })
        }
        ratingQueryCount++;
      }

      const total = {
        averageScore: averageScore.avg,
        totalReviews: surveyCount.count,
        totalPercentages: totalPercentages
      }
      res.status(200).json(total);
    }
    catch (error) {
      console.trace(error.stack);
      res.status(500).json(error.stack);
    }
  },

  getTeamSurveys: async (req, res) => {

    // const surveys = await Survey
    //   .query()
    //   .eager('user')
    //   .where('supervisorId', req.principal.id)
    //   .andWhere('users.active', true)
    //   .andWhere('companyId', req.principal.companyId)

    // res.status(200).json(surveys);
  }

};
