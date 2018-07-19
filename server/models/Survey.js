const { Model } = require('objection');

class Survey extends Model {
    static get tableName() {
        return 'surveys'
    }

    static get relationMappings() {
        const User = require('./User');
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'surveys.userId',
                    to: 'users.id'
                }
            }
        }
    }
}

module.exports = Survey;