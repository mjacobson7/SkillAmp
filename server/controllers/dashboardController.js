const { raw } = require('objection');
const Survey = require('../models/schema').Survey;
const User = require('../models/schema').User

const surveyService = require('../services/surveyService');
const userService = require('../services/userService');

module.exports = {

    getAdminWidgets: async (req, res) => {
        try {
            const widgetData = [];

            //totalCompanySurveys
            const companySurveysCount = await surveyService.getCompanySurveysCount(req.principal.companyId);
            widgetData.push({ label: 'Total Company Surveys', icon: 'fa-list-alt', cardColor: '#20a8d8', data: parseInt(companySurveysCount.count), info: 'The current number of surveys recorded for all agents in the company' })

            //averageCompanyScore
            const averageCompanyScore = await surveyService.getAverageCompanyScore(req.principal.companyId);
            widgetData.push({ label: 'Average Agent Score', icon: 'fa-star', cardColor: '#00acac', data: Math.ceil(averageCompanyScore[0].avg * 100) / 100, info: 'The combined average score for all agents in the company' })

            res.status(200).json(widgetData);
        }
        catch (error) {
            console.trace(error.stack);
            res.status(500).json(error.stack);
        }
    },

    getSupervisorWidgets: async (req, res) => {
        try {
            const widgetData = [];

            //totalTeamSurveys
            const teamSurveyCount = await surveyService.getTeamSurveysCount(req.principal.id, req.principal.companyId);
            widgetData.push({ label: 'Total Team Surveys', icon: 'fa-list-alt', cardColor: '#20a8d8', data: parseInt(teamSurveyCount.count), info: 'The current number of surveys recorded for all agents in your team' })

            //averageTeamScore
            const averageTeamScore = await surveyService.getAverageTeamScore(req.principal.id, req.principal.companyId);
            widgetData.push({ label: 'Average Agent Score', icon: 'fa-star', cardColor: '#00acac', data: Math.ceil(averageTeamScore.avg * 100) / 100, info: 'The combined average score for all agents in your team' })

            //teamRankInCompany
            const supervisorsInCompany = await userService.getSupervisorsInCompany(req.principal.companyId);

            let companyRank = [];

            for (let supervisor of supervisorsInCompany) {
                const average = await surveyService.getAverageTeamScore(supervisor.id, req.principal.companyId);
                const teamAverage = {
                    supervisorId: supervisor.id,
                    averageScore: average.avg
                }
                companyRank.push(teamAverage);
            }
            companyRank.sort((a, b) => b.averageScore - a.averageScore);
            widgetData.push({ label: 'Team Rank in Company', icon: 'fa-building', cardColor: '#efa64c', data: companyRank.findIndex(x => x.supervisorId === req.principal.id) + 1, info: 'Where your team currently ranks against all other teams in the company' })
            res.status(200).json(widgetData);
        }
        catch (error) {
            console.trace(error.stack)
            res.status(500).json(error.stack);
        }
    },

    getAgentWidgets: async (req, res) => {
        try {
            widgetData = [];

            //totalAgentSurveys
            const totalAgentSurveys = await surveyService.getAgentSurveysCountById(req.principal.id, req.principal.companyId);
            widgetData.push({ label: 'Total Surveys', icon: 'fa-list-alt', cardColor: '#20a8d8', data: parseInt(totalAgentSurveys.count), info: 'The total number of surveys you have received' })

            //averageAgentScore
            const averageAgentScore = await surveyService.getAverageAgentScoreById(req.principal.id, req.principal.companyId);
            widgetData.push({ label: 'Average Score', icon: 'fa-star', cardColor: '#00acac', data: Math.ceil(averageAgentScore.avg * 100) / 100, info: 'The combined average score for all your surveys' })

            //agentRankInTeam
            const agentRank = await surveyService.getAgentRankInTeam(req.principal.companyId);

            agentRank.sort((a, b) => b.avg - a.avg);

            if (req.principal.supervisorId) {
                let agentRankInTeam = agentRank.filter(x => x.user.supervisorId === req.principal.supervisorId);
                widgetData.push({ label: 'Team Rank', icon: 'fa-users', cardColor: '#6c76af', data: agentRankInTeam.findIndex(x => x.user.id === req.principal.id) + 1, info: 'Where you currently ranks against all other agents in your team' })
            } else {
                widgetData.push({ label: 'Team Rank', icon: 'fa-users', cardColor: '#6c76af', data: '-', info: 'Where you currently rank against all other agents in your team' })
            }

            //userCompanyRank
            widgetData.push({ label: 'Company Rank', icon: 'fa-building', cardColor: '#efa64c', data: agentRank
            .findIndex(x => x.user.id === req.principal.id) + 1, info: 'Where you currently rank against all other agents in the company' })

            res.status(200).json(widgetData);
        }
        catch (error) {
            console.trace(error.stack);
            res.status(500).json(error.stack);
        }
    },

    getTeamLeaderboard: async (req, res) => {
        try {
            let { pageSize, length, pageNumber, orderBy, orderDir, searchText } = req.body.params;

            if (searchText !== "") {
                length = null,
                    pageNumber = 1
            }

            let offset = (pageNumber - 1) * pageSize;
            searchText = '%' + searchText.toLowerCase() + '%';

            let { pageIndex } = req.body.params;
            let teamRankings = [];
            let count;

            //for agent
            if (req.principal.supervisorId) {
                count = await userService.getAgentsInTeamCount(req.principal.supervisorId, req.principal.companyId);

            } else {
                const leaderboard = {
                    rankings: teamRankings,
                    length: 0
                }
                return res.status(200).json(leaderboard);
            }

            teamRankings = await User
                .query()
                .select(raw('dense_rank() OVER (ORDER BY AVG(surveys.rating) desc NULLS LAST) rank, ' +
                    'round(AVG(surveys.rating), 2) as "averageScore", users.*'))
                .joinRaw('left join surveys ON surveys."userId" = users.id')
                .where(raw('users."companyId" = ??', req.principal.companyId))
                .andWhere(raw('users."supervisorId" = ??', req.principal.supervisorId))
                .groupByRaw('users.id')
                .limit(pageSize)
                .offset(offset)


            for (let userRank of teamRankings) {
                if (!userRank.averageScore) {
                    userRank.averageScore = '-';
                }
            }

            const leaderboard = {
                rankings: teamRankings,
                length: count[0].count
            }

            res.status(200).json(leaderboard);
        }
        catch (error) {
            console.trace(error.stack);
            res.status(500).json(error.stack);
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

            const surveys = await Survey
                .query()
                .select('rating', 'createdAt')
                .where('userId', req.principal.id)
                .andWhere('companyId', req.principal.companyId)
                .whereBetween('createdAt', [startDate, endDate])
                .orderBy('createdAt', 'ASC')

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
            console.trace(error.stack);
            res.status(500).json(error.stack);
        }
    }


} //end controller