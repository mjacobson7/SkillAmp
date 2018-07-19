const { Model } = require('objection');
const User = require('./User');
const Permission = require('./Permission');

class Role extends Model {
    static get tableName() {
        return 'roles'
    }

    static get relationMappings() {
        return {
            user: {
                relation: Model.ManyToManyRelation,
                modelClass: User,
                join: {
                    from: 'roles.id',
                    through: {
                        from: 'userRoles.roleId',
                        to: 'userRoles.userId'
                    },
                    to: 'users.id'
                }
            },
            permission: {
                relation: Model.ManyToManyRelation,
                modelClass: Permission,
                join: {
                    from: 'roles.id',
                    through: {
                        from: 'rolePermission.roleId',
                        to: 'rolePermission.permissionName'
                    },
                    to: 'permissions.name'
                }
            }
        }
    }
}

module.exports = Role;