const Company = require('../models/schema').Company;
const Role = require('../models/schema').Role;

module.exports = {

    getCompanyByHostname: (hostname) => {
        return Company.query().where({hostname: hostname}).then(company => company[0]);
    },

    createCompany: (name, hostname) => {
        return Company.query().insert({ name: name, hostname: hostname });
    },

    insertCompanyDefaultRoles: (companyId) => {
        return Role.query().insert([
            { companyId: companyId, name: 'User', isUserRole: true, isSupervisorRole: false, isAdminRole: false },
            // { companyId: companyId, name: 'Supervisor', isUserRole: false, isSupervisorRole: true, isAdminRole: false }, //This is a system assigned role that is only given to supervisors
            { companyId: companyId, name: 'Admin', isUserRole: false, isSupervisorRole: false, isAdminRole: true }
          ]).returning('*')
    }

}