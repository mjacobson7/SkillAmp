const Feedback = require('../models/index').feedback;
const User = require('../models/index').user;

module.exports = {

  addFeedback: async (req, res) => {
    const dbInstance = req.app.get('db');
    let { companyId, userId, rating, like, dislike, productDescription } = req.body;

    try {
      await dbInstance.add_feedback([userId, companyId, rating, like, dislike, productDescription]);
      res.status(200).json("Feedback Created!");
    }
    catch(error) {
      console.log(error);
      res.status(500).json(error); 
    }
  },

  getMyFeedback: async (req, res) => {
    const dbInstance = req.app.get('db');

    try {
      const myFeedback = await dbInstance.get_my_feedback([req.principal.id, req.principal.companyId]);
      res.status(200).json(myFeedback);
    }
    catch(error) {
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
