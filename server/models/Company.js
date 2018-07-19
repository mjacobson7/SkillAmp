const { Model } = require('objection')

class Company extends Model {
    static get tableName() {
        return 'company'
    }
}

module.exports = Company;