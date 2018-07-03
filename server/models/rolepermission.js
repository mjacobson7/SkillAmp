const { Model } = require('objection');
const Role = require('./Role');
const Permission = require('./Permission');

class RolePermission extends Model {
    static get tableName() {
        return 'rolePermission'
    }

    static get idColumn() {
        return ['roleId', 'permissionName'];
    }

    static get relationMappings() {
        return {
            roles: {
                relation: Model.BelongsToOneRelation,
                modelClass: Role,
                join: {
                    from: 'rolePermission.roleId',
                    to: 'roles.id'
                }
            },
            permission: {
                relation: Model.BelongsToOneRelation,
                modelClass: Permission,
                join: {
                    from: 'rolePermission.permissionName',
                    to: 'permissions.name'
                }
            }
        }
    }
}

module.exports = RolePermission;