module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameTable("Feedbacks", "Surveys");
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameTable("Surveys", "Feedbacks");
  }
};
