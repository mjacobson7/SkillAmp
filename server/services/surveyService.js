const Survey = require('../models/schema').Survey;
const User = require('../models/schema').User;
const { raw } = require('objection');


module.exports = {

    createSurvey: (survey) => {
        return Survey.query().insert(survey);
    },

    getCompanySurveysCount: (companyId) => {
        return Survey.query().count().where({ companyId: companyId }).then(surveyCount => surveyCount[0]);
    },

    getAverageCompanyScore: (companyId) => {
        return Survey.query().avg('rating').where({ companyId: companyId })
    },

    getTeamSurveysCount: (id, companyId) => {
        return Survey.query().count().joinRelation('user')
            .where({ 'user.supervisorId': id, 'surveys.companyId': companyId })
            .then(surveyCount => surveyCount[0])
    },

    getAverageTeamScore: (supervisorId, companyId) => {
        return Survey.query().avg('rating').joinRelation('user').where({ 'user.supervisorId': supervisorId, 'surveys.companyId': companyId })
            .then(avg => avg[0]);
    },

    getAgentSurveysCountById: (id, companyId) => {
        return Survey.query().count().where({ userId: id, companyId: companyId }).then(surveyCount => surveyCount[0]);
    },

    getSurveyCountByCompanyId: (companyId) => {
        return Survey.query().count().where({ companyId: companyId }).then(surveyCount => surveyCount[0]);
    },

    getAverageAgentScoreById: (id, companyId) => {
        return Survey.query().avg('rating').where({ userId: id, companyId: companyId }).then(avg => avg[0]);
    },

    getAverageAgentScoreByCompanyId: (companyId) => {
        return Survey.query().avg('rating').where({ companyId: companyId }).then(avg => avg[0]);
    },

    getAgentRankInTeam: (companyId) => {
        return Survey.query().eager('user').avg('rating').where('surveys.companyId', companyId).groupBy('surveys.userId')
    },

    getAgentSurveyPageCount: (userId, ratingSort, companyId) => {
        return Survey.query().count().whereIn('rating', ratingSort)
            .andWhere({ userId: userId, companyId: companyId }).then(surveyCount => surveyCount[0]);
    },

    getTeamSurveyPageCount: (supervisorId, ratingSort, companyId) => {
        return Survey.query().count().joinRelation('user').whereIn('rating', ratingSort)
            .andWhere({ 'user.supervisorId': supervisorId, 'user.companyId': companyId }).then(surveyCount => surveyCount[0]);
    },

    getAllSurveysPageCount: (ratingSort, companyId) => {
        return Survey.query().count().whereIn('rating', ratingSort).andWhere({ companyId: companyId }).then(surveyCount => surveyCount[0])
    },

    getAgentSurveyPage: (userId, ratingSort, dateSort, offset, pageSize, companyId) => {
        return Survey.query().whereIn('rating', ratingSort).andWhere({ userId: userId, companyId: companyId }).orderBy('createdAt', dateSort)
            .offset(offset).limit(pageSize);
    },

    getTeamSurveyPage: async (supervisorId, ratingSort, dateSort, offset, pageSize, agentSort, companyId) => {
        if (!agentSort) agentSort = undefined;
        return await Survey.query().eager('user').joinRelation('user').whereIn('rating', ratingSort).skipUndefined()
            .andWhere({ 'user.supervisorId': supervisorId, 'user.companyId': companyId, 'user.id': agentSort })
            .orderBy('createdAt', dateSort).offset(offset).limit(pageSize)
    },

    getAllSurveysPage: (ratingSort, dateSort, offset, pageSize, agentSort, companyId) => {
        if (!agentSort) agentSort = undefined;
        return Survey.query().eager('user').whereIn('rating', ratingSort).skipUndefined()
            .andWhere({ companyId: companyId, userId: agentSort })
            .orderBy('createdAt', dateSort).offset(offset).limit(pageSize)
    },

    getAgentSurveyCountByRatingAndId: (userId, ratingQueryCount, companyId) => {
        return Survey.query().sum('rating').where({ userId: userId, companyId: companyId, rating: ratingQueryCount })
            .then(ratingCount => ratingCount[0]);
    },

    getTeamSurveyCountByRating: (supervisorId, ratingQueryCount, companyId) => {
        return Survey.query().joinRelation('user').sum('rating')
            .where({ 'user.supervisorId': supervisorId, 'user.companyId': companyId, rating: ratingQueryCount })
            .then(ratingCount => ratingCount[0]);
    },

    getSurveyCountByRatingAndCompanyId: (ratingQueryCount, companyId) => {
        return Survey.query().sum('rating').where({ companyId: companyId, rating: ratingQueryCount })
            .then(ratingCount => ratingCount[0]);
    },

    getTeamRankings: (companyId, supervisorId, pageSize, offset) => {
        return User.query()
            .select(raw('dense_rank() OVER (ORDER BY AVG(surveys.rating) desc NULLS LAST) rank, ' +
                'round(AVG(surveys.rating), 2) as "averageScore", users.*'))
            .joinRaw('left join surveys ON surveys."userId" = users.id')
            .where(raw('users."companyId" = ??', companyId))
            .andWhere(raw('users."supervisorId" = ??', supervisorId))
            .groupByRaw('users.id')
            .limit(pageSize)
            .offset(offset)
    },

    getCompanyRankings: (companyId, pageSize, offset) => {
        return User.query()
            .select(raw('dense_rank() OVER (ORDER BY AVG(surveys.rating) desc NULLS LAST) rank, ' +
                'round(AVG(surveys.rating), 2) as "averageScore", users.*'))
            .joinRaw('left join surveys ON surveys."userId" = users.id')
            .where(raw('users."companyId" = ??', companyId))
            .groupByRaw('users.id')
            .limit(pageSize)
            .offset(offset)
    },

    getAgentChartSurveys: (companyId, userId, startDate, endDate) => {
        return Survey.query().select('rating', 'createdAt')
            .where({ userId: userId, companyId: companyId })
            .whereBetween('createdAt', [startDate, endDate])
            .orderBy('createdAt', 'ASC')
    },

    getSupervisorChartSurveys: (companyId, supervisorId, startDate, endDate) => {
        return Survey.query().select('rating', 'surveys.createdAt')
            .joinRelation('user')
            .where({ 'user.supervisorId': supervisorId, 'user.companyId': companyId })
            .whereBetween('surveys.createdAt', [startDate, endDate])
            .orderBy('surveys.createdAt', 'ASC')
    }
}