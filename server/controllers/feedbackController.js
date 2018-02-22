const Feedback = require('../models/index').feedback;
const User = require('../models/index').user;

module.exports = {

  addFeedback: (req, res) => {
    console.log(req.body);
    Feedback.create({
      companyId: req.auth.companyId,
      userId: req.body.userId,
      rating: req.body.rating,
      like: req.body.like,
      dislike: req.body.dislike,
      productDescription: req.body.productDescription
    })
      .then(() => {
        res.status(200).json("Feedback Created!");
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      })
  },

  getMyFeedback: (req, res) => {
    Feedback.findAll({ where: { userId: req.auth.userId, companyId: req.auth.companyId }}).then((feedback) => {
      res.status(200).json(feedback);
    })
  },

  getTeamFeedback: (req, res) => {
    Feedback.findAll({
      include: [{
        model: User,
        where: { supervisorId: req.auth.userId, companyId: req.auth.companyId }
      }]
    }).then((feedback) => {
      res.status(200).json(feedback);
    })
  }

};
