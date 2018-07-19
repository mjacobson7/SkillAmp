const { Model } = require('objection')
const Role = require('./Role');
const User = require('./User');

class UserRole extends Model {
    static get tableName() {
        return 'userRoles'
    }

    static get idColumn() {
        return ['userId', 'roleId']
    }

    static get relationMappings() {
        return {
            role: {
                relation: Model.BelongsToOneRelation,
                modelClass: Role,
                join: {
                    from: 'roles.id',
                    to: 'userRoles.roleId'
                }
            },
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'users.id',
                    to: 'userRoles.userId'
                }
            }
        }
    }
}

module.exports = UserRole;