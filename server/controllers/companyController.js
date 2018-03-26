const bcrypt = require('bcrypt');
const secrets = require('../config/secrets');

module.exports = {
  createCompany: async (req, res) => {
    const dbInstance = req.app.get('db');
    let { name, hostname } = req.body;
    try {
      await dbInstance.create_company([name, hostname]);
      const company = await dbInstance.find_company_by_hostname([hostname]);
      let password = secrets.supportPassword;
      const salt = bcrypt.genSaltSync();
      password = bcrypt.hashSync(password, salt);
      await dbInstance.create_user([company[0].id, 'skillampsupport', 'SkillAmp', 'Support', 'support@skillamp.io', password, null]);
      let supportUser = await dbInstance.get_user_by_username(['skillampsupport', company[0].id]);
      let availableRoles = await dbInstance.get_all_roles();
      for(let currentRole of availableRoles) {
        await dbInstance.add_user_roles([company[0].id, supportUser[0].id, currentRole.id]);        
      }


      res.status(200).json(supportUser);
    }
    catch(error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

};
