const Knex = require('knex')
const connection = require('../knexfile')
const { Model } = require('objection')
const knexConnection = Knex(connection)
Model.knex(knexConnection);

const User = require('./User');
const Company = require('./Company');
const Role = require('./Role');
const UserRole = require('./UserRole');
const RolePermission = require('./RolePermission');
const Permission = require('./Permission');
const Survey = require('./Survey');
const ErrorDebugInfo = require('./ErrorDebugInfo');

module.exports = {
    User,
    RolePermission,
    Role,
    Company,
    Permission,
    Survey,
    UserRole,
    ErrorDebugInfo
}

