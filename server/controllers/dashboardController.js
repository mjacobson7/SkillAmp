const Survey = require('../models/index').survey;
const User = require('../models/index').user;
const Role = require('../models/index').role;
const UserRole = require('../models/index').userRole;
const db = require('../models');

module.exports = {

    getUserWidgetData: async (req, res) => {
        try {
            let widgetInfo = await Survey.findAll({
                include: { model: User, where: { companyId: req.principal.companyId } },
                group: ['user.id'],
                attributes: [
                    [Survey.sequelize.fn('COUNT', Survey.sequelize.col('rating')), 'count'],
                    [Survey.sequelize.fn('AVG', Survey.sequelize.col('rating')), 'score']
                ]
            })

            // Sort company-wide average scores from highest to lowest
            widgetInfo.sort((a, b) => b.dataValues.score - a.dataValues.score);

            // Find where user ranks in company
            let companyRank = widgetInfo.findIndex(x => x.user.id === req.principal.id) + 1;

            // Filter users in team (if current user is part of a team)
            let teamRank = null;
            if (req.principal.supervisorId) {
                let team = widgetInfo.filter(x => x.user.supervisorId === req.principal.supervisorId);
                // Find where user ranks on team
                teamRank = team.findIndex(x => x.user.id === req.principal.id) + 1;
            }

            // Get current user average score and # of surveys
            let user = widgetInfo.filter(x => x.user.id === req.principal.id);

            res.status(200).json({ user, teamRank, companyRank });
        }
        catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    },

    getTeamLeaderboard: async (req, res) => {
        try {
            let { pageIndex } = req.body.params;
            let offset = (pageIndex) * 5;
            let teamRankings = [];
            let count;

            if(req.principal.supervisorId) {
                count = await User.count({ where: { companyId: req.principal.companyId, supervisorId: req.principal.supervisorId } });
            } else {
                count = 0;
            }

            teamRankings = await db.sequelize.query(
                'SELECT dense_rank() OVER (ORDER BY AVG(s.rating) desc NULLS LAST) rank, ' +
                'round(AVG(s.rating), 2) as "average_score", u.* FROM users u LEFT JOIN surveys s ' +
                'ON s.user_id = u.id WHERE u.company_id = :companyId AND u.supervisor_id = :supervisorId ' +
                'GROUP BY u.id LIMIT 5 OFFSET :offset;',
                { replacements: { companyId: req.principal.companyId, supervisorId: req.principal.supervisorId, offset: offset } }
            )

            teamRankings = teamRankings[0];
            
            for(let userRank of teamRankings) {
                if(!userRank.average_score) {
                    userRank.average_score = '-';
                }
            }

            const leaderboard = {
                rankings: teamRankings,
                length: count
            }

            res.status(200).json(leaderboard);
        }
        catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    },

    getSurveyChartData: async (req, res) => {
        try {
            let sort = req.body.sort;
            let data = [];
            let labels = [];
            let days;

            if (sort === '1M') days = 30;
            else if (sort === '3M') days = 90;
            else if (sort === '6M') days = 180;
            else if (sort === '1Y') days = 365;
            else if (sort === '5Y') days = 1825;
            else { /*throw error */ }


            let endDate = new Date();
            endDate.setHours(23, 59, 59, 999);
            let startDate = new Date();
            startDate.setDate(startDate.getDate() - days);
            startDate.setHours(0, 0, 0, 0);


            let surveys = await Survey.findAll({
                where: {
                    userId: req.principal.id,
                    companyId: req.principal.companyId,
                    createdAt: { between: [startDate, endDate] }
                },
                attributes: ['rating', 'createdAt'],
                order: [['createdAt', 'ASC']]

            })

            for (let survey of surveys) {
                data.push(survey.rating);
                let date = new Date(survey.createdAt);
                let month = date.getMonth() + 1;
                let day = date.getDate();
                let year = date.getFullYear();
                let newdate = month + "/" + day + "/" + year;
                labels.push(newdate);
            }

            res.status(200).json({ labels: labels, data: [{ data: data }] });
        }
        catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }


} //end controller