const Feedback = require('../models/index').Feedback;
const sequelize = require('sequelize');

module.exports = {

  addFeedback: async (req, res) => {
    try {
      await Feedback.create(req.body);
      res.status(200).json("Feedback Created!");
    }
    catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  getMyFeedback: async (req, res) => {
    try {
      let { pageIndex, pageSize, ratingSort, dateSort } = req.body.params;
      let count = await Feedback.count({
        where: { userId: req.principal.id, companyId: req.principal.companyId, rating: ratingSort }
      })
      let offset = (pageIndex) * pageSize;
      let myFeedback = await Feedback.findAll({
        where: { userId: req.principal.id, companyId: req.principal.companyId, rating: ratingSort },
        order: [['createdAt', dateSort]],
        offset: offset,
        limit: pageSize
      })
      const myFeedbackPage = {
        content: myFeedback,
        length: count
      }
      res.status(200).json(myFeedbackPage);
    }
    catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  getMyFeedbackScore: async (req, res) => {
    try {
      let avgAndCount = await Feedback.find({
        where: { userId: req.principal.id, companyId: req.principal.companyId },
        attributes: [
          [Feedback.sequelize.fn('AVG', Feedback.sequelize.col('rating')), 'avg'],
          [Feedback.sequelize.fn('COUNT', Feedback.sequelize.col('rating')), 'count']
        ]
      });

      if (!avgAndCount.dataValues.avg) { avgAndCount.dataValues.avg = 0 };

      let totalPercentages = [];
      let ratingQueryCount = 1;

      for (let i = 0; i < 5; i++) {
        let ratingAvg = await Feedback.findAll({
          where: { userId: req.principal.id, companyId: req.principal.companyId, rating: ratingQueryCount },
          attributes: [[Feedback.sequelize.fn('COUNT', Feedback.sequelize.col('rating')), 'sum']]
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

  getTeamFeedback: (req, res) => {
    Feedback.findAll({
      include: [{
        model: User,
        where: { supervisorId: req.user.id, companyId: req.user.companyId }
      }]
    }).then((feedback) => {
      res.status(200).json(feedback);
    })
  }

};
