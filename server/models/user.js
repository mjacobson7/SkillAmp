const { Model } = require('objection')

class User extends Model {
    static get tableName() {
        return 'users'
    }

    async hasPermission(permissionName) {
        const RolePermission = require('./RolePermission');
        const UserRole = require('./UserRole');

        const userRoles = await UserRole
            .query()
            .select('roleId')
            .where('userId', this.id)
            .where('companyId', this.companyId)

        for (let userRole of userRoles) {
            let userPermissions = await RolePermission
                .query()
                .where('companyId', this.companyId)
                .andWhere('permissionName', permissionName)
                .andWhere('roleId', userRole.roleId)

            if (userPermissions.length > 0) {
                return true;
            }
        }

        return false;

    }



    static get relationMappings() {
        const Survey = require('./Survey');
        const Role = require('./Role');
        const Permission = require('./Permission');

        return {
            supervisor: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'users.id',
                    to: 'users.supervisorId'
                }
            },
            surveys: {
                relation: Model.HasManyRelation,
                modelClass: Survey,
                join: {
                    from: 'users.id',
                    to: 'surveys.userId'
                }
            },
            roles: {
                relation: Model.ManyToManyRelation,
                modelClass: Role,
                join: {
                    from: 'users.id',
                    through: {
                        from: 'userRoles.userId',
                        to: 'userRoles.roleId'
                    },
                    to: 'roles.id'
                }
            }
        }
    }
}

module.exports = User;