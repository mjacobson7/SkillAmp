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
                where: { id: req.user.id, companyId: req.user.companyId }}).then((response) => {
                  User.find({
                    where: { id: req.user.id, companyId: req.user.companyId },
                    include: [
                      {
                        model: User,
                        as: "supervisor",
                      },
                      {
                        model: Role,
                        through: UserRole
                      }]
                  }).then((profile) => {
                    res.status(200).json(profile.dataValues);
                  })
            })
    },

    getCurrentUser: (req, res) => {
      User.find({
        where: { id: req.user.id, companyId: req.user.companyId },
        include: [
          {
            model: User,
            as: "supervisor",
          },
          {
            model: Role,
            through: UserRole
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

    getSupervisorDropdown: (req, res) => {
      User.findAll({
        where: { companyId: req.user.companyId },
        include: [{ model: Role, where: { type: 'SUPERVISOR'}}],
      }).then(supervisors => {
        let supervisorList = [];
        supervisors.forEach(supervisor => {
          let supervisorObj = {};
          supervisorObj.id = supervisor.id;
          supervisorObj.name = supervisor.getFullName() + ' ' + '(' + supervisor.username + ')';
          supervisorList.push(supervisorObj);
        });
        res.status(200).json(supervisorList);
      });
    },

    getRolesDropdown: (req, res) => {
      Role.findAll().then(roles => {
        let roleList = [];
        roles.forEach(role => {
          let roleObj = {};
          roleObj.id = role.id;
          roleObj.name = role.name;
          if(role.type === 'USER') {
            roleObj.disabled = true;
          }
          roleList.push(roleObj);
        });
        res.status(200).json(roleList);
      })
    }


};
