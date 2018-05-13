const Survey = require('../models/index').survey;
const User = require('../models/index').user;
const Role = require('../models/index').role;

module.exports = {

    getUserWidgetData: async (req, res) => {
        let widgetData = {};
        let companyAverages = [];

        try {
            let usersInCompany = await User.findAll({
                where: { companyId: req.principal.companyId },
                include: { model: Role, as: 'roles', where: { isUserRole: true } },
                attributes: ['id']
            })

            for (let user of usersInCompany) {
                let avgAndCount = await Survey.find({
                    where: { userId: user.id, companyId: req.principal.id },
                    group: ['userId'],
                    attributes: [
                        'userId',
                        [Survey.sequelize.fn('AVG', Survey.sequelize.col('rating')), 'averageScore'],
                        [Survey.sequelize.fn('COUNT', Survey.sequelize.col('rating')), 'reviewCount']
                    ]
                })
                if (avgAndCount != null) companyAverages.push(avgAndCount);
            }

            //Sort company-wide average scores then find where user ranks
            companyAverages.sort((a, b) => b.dataValues.averageScore - a.dataValues.averageScore);
            widgetData.userCompanyRank = companyAverages.findIndex(x => x.userId = req.principal.id) + 1;

            //Sort team-wide average scores then find where user ranks
            let teamAverages = companyAverages.filter(x => x.supervisorId = req.principal.supervisorId);
            widgetData.userTeamRank = teamAverages.findIndex(x => x.userId = req.principal) + 1;

            widgetData.userScoreAndCount = teamAverages.find(x => x.userId = req.principal.id);

            if(!widgetData.userScoreAndCount) {
                widgetData.userScoreAndCount = {
                    averageScore: 0,
                    reviewCount: 0
                }
            }
            
            res.status(200).json(widgetData);
        }
        catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }


} //end controller