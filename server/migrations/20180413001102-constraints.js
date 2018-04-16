'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addConstraint('Users', ['username', 'companyId'], {
      type: 'unique',
      name: 'usernameCompanyIdIdx'
    })

    queryInterface.addConstraint('Companies', ['name'], {
      type: 'unique',
      name: 'uniqueCompanyName'
    })
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeConstraint('Users', 'usernameCompanyIdIdx');    
    queryInterface.removeConstraint('Companies', 'uniqueCompanyName');    
  }
};
