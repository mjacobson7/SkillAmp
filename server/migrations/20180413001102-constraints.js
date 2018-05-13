module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addConstraint('users', ['username', 'company_id'], {
      type: 'unique',
      name: 'usernameCompanyIdIdx'
    })

    queryInterface.addConstraint('company', ['name'], {
      type: 'unique',
      name: 'uniqueCompanyName'
    })
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeConstraint('users', 'usernameCompanyIdIdx');    
    queryInterface.removeConstraint('company', 'uniqueCompanyName');    
  }
};
