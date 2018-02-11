var userController = require('./userController');

module.exports = (app) => {

    app.put('/updateUser', userController.updateUser);
    

}