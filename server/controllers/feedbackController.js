const Feedback = require('../models/index').Feedback;
const User = require('../models/index').User;

module.exports = {

  addFeedback: (req, res) => {
    Feedback.create({
      rating: req.body.rating,
      like: req.body.like,
      dislike: req.body.dislike,
      productDescription: req.body.productDescription,
      userId: req.body.userId
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
    Feedback.findAll({ where: { userId: req.auth.user.id }}).then((feedback) => {
      res.status(200).json(feedback);
    })
  },

  getTeamFeedback: (req, res) => {
    Feedback.findAll({
      include: [{
        model: User,
        where: { supervisorId: req.auth.user.id }
      }]
    }).then((feedback) => {
      res.status(200).json(feedback);
    })
  }

};
