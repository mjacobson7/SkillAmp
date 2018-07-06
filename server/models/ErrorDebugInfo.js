const { Model } = require('objection')

class ErrorDebugInfo extends Model {
    static get tableName() {
        return 'errorDebugInfo'
    }
}

module.exports = ErrorDebugInfo;