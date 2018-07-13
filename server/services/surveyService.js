const Survey = require('../models/schema').Survey;

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

    getAverageTeamScore: (id, companyId) => {
        return Survey.query().avg('rating').joinRelation('user').where({ 'user.supervisorId': id, 'surveys.companyId': companyId })
            .then(avg => avg[0]);
    },

    getAgentSurveysCount: (id, companyId) => {
        return Survey.query().count().where({ userId: id, companyId: companyId }).then(surveyCount => surveyCount[0]);
    },

    getAverageAgentScore: (id, companyId) => {
        return Survey.query().avg('rating').where({ userId: id, companyId: companyId }).then(avg => avg[0]);
    },

    getAgentRankInTeam: (companyId) => {
        return Survey.query().eager('user').avg('rating').where('surveys.companyId', companyId).groupBy('surveys.userId')
    },

    getAgentSurveyPageCount: (userId, ratingSort, companyId) => {
        return Survey.query().count().whereIn('rating', ratingSort)
            .andWhere({ userId: userId, companyId: companyId }).then(surveyCount => surveyCount[0]);
    },

    getAgentSurveyPage: (userId, ratingSort, dateSort, offset, pageSize, companyId) => {
        return Survey.query().whereIn('rating', ratingSort).andWhere({ userId: userId, companyId: companyId }).orderBy('createdAt', dateSort)
            .offset(offset).limit(pageSize);
    },

    getSurveyCountByRating: (userId, ratingQueryCount, companyId) => {
        return Survey.query().sum('rating').where({ userId: userId, companyId: companyId, rating: ratingQueryCount })
            .then(ratingCount => ratingCount[0]);
    }
}