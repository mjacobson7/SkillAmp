const { Model } = require('objection');
const Role = require('./Role');

class Permission extends Model {
    static get tableName() {
        return 'permissions'
    }

    static get relationMappings() {
        return {
            role: {
                relation: Model.ManyToManyRelation,
                modelClass: Role,
                join: {
                    from: 'permissions.name',
                    through: {
                        from: 'rolePermission.permissionName',
                        to: 'rolePermission.roleId'
                    },
                    to: 'roles.id'
                }
            }
        }
    }
}

module.exports = Permission;