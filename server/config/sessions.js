module.exports = () => {
   
// middleware function to check for logged-in users
var sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        res.status(200).json("Already logged in; TODO: redirect to dashboard"); //TODO: Redirect to dashboard
    } else {
        next();
    }    
};
}