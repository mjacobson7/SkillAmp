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

  getMySurveyScore: async (req, res) => {
    try {
      const averageScore = await surveyService.getAverageAgentScoreById(req.principal.id, req.principal.companyId);
      const surveyCount = await surveyService.getAgentSurveysCountById(req.principal.id, req.principal.companyId);

      !averageScore.avg ? averageScore.avg = 0 : '';

      let totalPercentages = [];
      let ratingQueryCount = 1;

      for (let i = 0; i < 5; i++) {
        let ratingAverage = await surveyService.getAgentSurveyCountByRatingAndId(req.principal.id, ratingQueryCount, req.principal.companyId);
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

  getTeamSurveyScore: async (req, res) => {
    try {
      const averageScore = await surveyService.getAverageTeamScore(req.principal.id, req.principal.companyId);
      const surveyCount = await surveyService.getTeamSurveysCount(req.principal.id, req.principal.companyId);

      !averageScore.avg ? averageScore.avg = 0 : '';

      let totalPercentages = [];
      let ratingQueryCount = 1;

      for (let i = 0; i < 5; i++) {
        let ratingAverage = await surveyService.getTeamSurveyCountByRating(req.principal.id, ratingQueryCount, req.principal.companyId);
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

  getAllSurveyScore: async (req, res) => {
    try {
      const averageScore = await surveyService.getAverageAgentScoreByCompanyId(req.principal.companyId);
      const surveyCount = await surveyService.getSurveyCountByCompanyId(req.principal.companyId);
                                              
      !averageScore.avg ? averageScore.avg = 0 : '';

      let totalPercentages = [];
      let ratingQueryCount = 1;

      for (let i = 0; i < 5; i++) {             
        let ratingAverage = await surveyService.getSurveyCountByRatingAndCompanyId(ratingQueryCount, req.principal.companyId);
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

  getMySurveysPage: async (req, res) => {
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

  getTeamSurveysPage: async (req, res) => {
    try {
      const { pageIndex, pageSize, ratingSort, dateSort, agentSort } = req.body.params;

      const surveyCount = await surveyService.getTeamSurveyPageCount(req.principal.id, ratingSort, req.principal.companyId);
      let offset = (pageIndex) * pageSize;

      const teamSurveys = await surveyService.getTeamSurveyPage(req.principal.id, ratingSort, dateSort, offset, pageSize, agentSort, req.principal.companyId);

      const teamSurveyPage = {
        content: teamSurveys,
        length: surveyCount.count
      }
      res.status(200).json(teamSurveyPage);
    }
    catch (error) {
      console.trace(error.stack);
      res.status(500).json(error.stack);
    }
  },

  getAllSurveysPage: async (req, res) => {
    try {
      const { pageIndex, pageSize, ratingSort, dateSort, agentSort } = req.body.params;

      const surveyCount = await surveyService.getAllSurveysPageCount(ratingSort, req.principal.companyId);

      let offset = (pageIndex) * pageSize;

      const allSurveys = await surveyService.getAllSurveysPage(ratingSort, dateSort, offset, pageSize, agentSort, req.principal.companyId);

      const AllSurveysPage = {
        content: allSurveys,
        length: surveyCount.count
      }
      res.status(200).json(AllSurveysPage);
    }
    catch (error) {
      console.trace(error.stack);
      res.status(500).json(error.stack);
    }
  }

};
