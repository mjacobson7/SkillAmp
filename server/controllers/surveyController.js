const Survey = require('../models/schema').Survey;
const authController = require('../controllers/authController');

module.exports = {

  addSurveys: async (req, res) => {
    try {
      await Survey
        .query()
        .insert(req.body)
      res.status(200).json("Survey Created!");
    }
    catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  getMySurveys: async (req, res) => {
    try {
      const { pageIndex, pageSize, ratingSort, dateSort } = req.body.params;

      const count = await Survey
        .query()
        .count()
        .whereIn('rating', ratingSort)
        .andWhere('userId', req.principal.id)
        .andWhere('companyId', req.principal.companyId)

      let offset = (pageIndex) * pageSize;

      const mySurveys = await Survey
        .query()
        .whereIn('rating', ratingSort)
        .andWhere('userId', req.principal.id)
        .andWhere('companyId', req.principal.companyId)
        .orderBy('createdAt', dateSort)
        .offset(offset)
        .limit(pageSize)

      const mySurveyPage = {
        content: mySurveys,
        length: count[0].count
      }
      res.status(200).json(mySurveyPage);
    }
    catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  getMySurveyScore: async (req, res) => {
    try {
      const averageScore = await Survey
        .query()
        .avg('rating')
        .where('userId', req.principal.id)
        .andWhere('companyId', req.principal.companyId)

      const surveyCount = await Survey
        .query()
        .count('rating')
        .where('userId', req.principal.id)
        .andWhere('companyId', req.principal.companyId)

      !averageScore[0].avg ? averageScore[0].avg = 0 : '';

      let totalPercentages = [];
      let ratingQueryCount = 1;

      for (let i = 0; i < 5; i++) {
        let ratingAverage = await Survey
          .query()
          .sum('rating')
          .where('userId', req.principal.id)
          .andWhere('companyId', req.principal.companyId)
          .andWhere('rating', ratingQueryCount)

        if (ratingAverage[0].sum > 0) {
          totalPercentages.unshift({ score: ratingQueryCount, percentage: ratingAverage[0].sum / surveyCount[0].count })
        } else {
          totalPercentages.unshift({ score: ratingQueryCount, percentage: 0 })
        }
        ratingQueryCount++;
      }

      const total = {
        averageScore: averageScore[0].avg,
        totalReviews: surveyCount[0].count,
        totalPercentages: totalPercentages
      }
      res.status(200).json(total);
    }
    catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  getTeamSurveys: async (req, res) => {

    const surveys = await Survey
      .query()
      .eager('user')
      .where('supervisorId', req.principal.id)
      .andWhere('companyId', req.principal.companyId)

    res.status(200).json(surveys);
  }

};
