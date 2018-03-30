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
    let myFeedback;
    let { pageIndex, pageSize, ratingSort, dateSort } = req.body.params;

    try {
      let count = await dbInstance.get_feedback_count([req.principal.id, req.principal.companyId, ratingSort]);
      console.log(count);
      let offset = (pageIndex) * pageSize;
      if(dateSort == 'ASC') {
        myFeedback = await dbInstance.get_my_feedback_asc([req.principal.id, req.principal.companyId, offset, pageSize, ratingSort]);        
      } else if(dateSort == 'DESC') {
        myFeedback = await dbInstance.get_my_feedback_desc([req.principal.id, req.principal.companyId, offset, pageSize, ratingSort]);
      }
      console.log(req.body.params);
      console.log(myFeedback);
      const myFeedbackPage = {
        content: myFeedback,
        length: count[0].count
      }

      res.status(200).json(myFeedbackPage);
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
