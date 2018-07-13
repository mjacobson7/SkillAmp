const User = require('../models/schema').User;

module.exports = {

    getUserById: (userId, companyId) => {
        return User.query().eager('[roles, supervisor]').where({ id: userId, companyId: companyId }).then(user => user[0]);
    },

    getUserByUsername: (username, companyId) => {
        return User.query().eager('[roles, supervisor]')
            .where({ username: username, active: true, companyId: companyId })
            .then(user => user[0])
    },

    createUser: (user) => {
        return User.query().insert(user)
    },

    getSupervisorsInCompany: (companyId) => {
        return User.query().joinRelation('roles').where({ 'roles.isSupervisorRole': true, 'users.companyId': companyId });
    },

    getAgentsInTeam: (supervisorId, companyId) => {
        return User.query().where({ companyId: companyId, supervisorId: supervisorId });
    },

    getAgentsInTeamCount: (supervisorId, companyId) => {
        return User.query().count().where({ companyId: companyId, supervisorId: supervisorId })
    },

    getUsersByCompanyId: (companyId) => {
        return User.query().where({ companyId: companyId });
    },

    getAllUsersPage: (companyId, searchText, pageSize, offset, orderBy, orderDir) => {
        return User.query().eager('[roles, supervisor]')
            .where({ companyId: companyId })
            .andWhere('username', 'like', '%' + searchText + '%')
            .orWhere('firstName', 'like', '%' + searchText + '%')
            .orWhere('lastName', 'like', '%' + searchText + '%')
            .limit(pageSize)
            .offset(offset)
            .orderBy(orderBy, orderDir)
    },

    getAllUsersCount: (companyId) => {
        return User.query().count().where({ companyId: companyId }).then(count => count[0])
    },

    getTeamPage: (supervisorId, companyId, searchText, pageSize, offset, orderBy, orderDir) => {
        return User.query().eager('[roles, supervisor]')
            .where({ companyId: companyId, supervisorId: supervisorId })
            .andWhere('username', 'like', '%' + searchText + '%')
            .orWhere('firstName', 'like', '%' + searchText + '%')
            .orWhere('lastName', 'like', '%' + searchText + '%')
            .limit(pageSize)
            .offset(offset)
            .orderBy(orderBy, orderDir)
    }

}