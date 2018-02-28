const User = require('../models/index').user;
const UserRole = require('../models/index').userRole;
const Role = require('../models/index').role;

module.exports = {

    updateUser: (req, res) => {
            User.update({
                username: req.body.username,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                // password: req.body.password,
                email: req.body.email,
                supervisor: req.body.supervisor,
                role: req.body.role
            },
            {
                where: { id: req.user.id, companyId: req.user.companyId }}).then(() => {
                  res.status(200).json(req.user);
            })
    },

    getMyProfile: (req, res) => {
      User.find({
        where: { id: req.user.id, companyId: req.user.companyId },
        include: [{
          model: User,
          as: "supervisor",
        }]
      }).then((profile) => {
        res.status(200).json(profile.dataValues);
      })
    },

    getAllUsers: (req, res) => {
      User.find({ where: { companyId: req.user.companyId }}).then((users) => {
        res.status(200).json(users);
      })
    },

    getSupervisorTeam: (req, res) => {
      User.find({ where: { supervisorId: req.user.id, companyId: req.user.companyId }}).then((users) => {
        res.status(200).json(users);
      })
    },

    getSupervisors: (req, res) => {
      // User.findAll({where: { companyId: req.user.companyId }}).then((supervisors) => {
      //   res.status(200).json(supervisors);
      // });

      Role.findAll({
        where: { isSupervisorRole: true },
        include: [{ model: User, where: { companyId: req.user.companyId } }]}).then((supervisors) => {
        res.status(200).json(supervisors);
      });


    }


};
