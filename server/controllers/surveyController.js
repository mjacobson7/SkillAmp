const Survey = require('../models/index').Survey;
const sequelize = require('sequelize');

module.exports = {

  addSurveys: async (req, res) => {
    try {
      await Survey.create(req.body);
      res.status(200).json("Survey Created!");
    }
    catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  getMySurveys: async (req, res) => {
    try {
      let { pageIndex, pageSize, ratingSort, dateSort } = req.body.params;
      let count = await Survey.count({
        where: { userId: req.principal.id, companyId: req.principal.companyId, rating: ratingSort }
      })
      let offset = (pageIndex) * pageSize;
      let mySurveys = await Survey.findAll({
        where: { userId: req.principal.id, companyId: req.principal.companyId, rating: ratingSort },
        order: [['createdAt', dateSort]],
        offset: offset,
        limit: pageSize
      })
      const mySurveyPage = {
        content: mySurveys,
        length: count
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
      let avgAndCount = await Survey.find({
        where: { userId: req.principal.id, companyId: req.principal.companyId },
        attributes: [
          [Survey.sequelize.fn('AVG', Survey.sequelize.col('rating')), 'avg'],
          [Survey.sequelize.fn('COUNT', Survey.sequelize.col('rating')), 'count']
        ]
      });

      if (!avgAndCount.dataValues.avg) { avgAndCount.dataValues.avg = 0 };

      let totalPercentages = [];
      let ratingQueryCount = 1;

      for (let i = 0; i < 5; i++) {
        let ratingAvg = await Survey.findAll({
          where: { userId: req.principal.id, companyId: req.principal.companyId, rating: ratingQueryCount },
          attributes: [[Survey.sequelize.fn('COUNT', Survey.sequelize.col('rating')), 'sum']]
        })

        if (ratingAvg[0].dataValues.sum > 0) {
          totalPercentages.unshift({ score: ratingQueryCount, percentage: ratingAvg[0].dataValues.sum / avgAndCount.dataValues.count })
        } else {
          totalPercentages.unshift({ score: ratingQueryCount, percentage: 0 })
        }
        ratingQueryCount++;
      }

      const total = {
        averageScore: avgAndCount.dataValues.avg,
        totalReviews: avgAndCount.dataValues.count,
        totalPercentages: totalPercentages
      }
      res.status(200).json(total);
    }
    catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  getTeamSurveys: (req, res) => {
    Survey.findAll({
      include: [{
        model: User,
        where: { supervisorId: req.user.id, companyId: req.user.companyId }
      }]
    }).then((surveys) => {
      res.status(200).json(surveys);
    })
  }

};
