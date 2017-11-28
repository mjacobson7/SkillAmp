module.exports = (app, sessionChecker, authController) => {
    
        //User signup
        // app.post('/signup', sessionChecker, authController.createUser());
    
        //User login
        app.post('/login', sessionChecker, authController.userLogin());
    
        //Remove and add to angular logic?
        // // route for user's dashboard
        // app.get('/dashboard', );
        
        
        // route for user logout
        app.get('/logout', authController.userLogout);
        
        

        //put somewhere else???
        // // route for handling 404 requests(unavailable routes)
        // app.use(function (req, res, next) {
        //   res.status(404).send("Sorry can't find that!")
        // });
    
                
                
                
    }