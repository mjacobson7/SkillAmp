const User = require('../models/index').User;
const UserRole = require('../models/index').UserRole;
const Role = require('../models/index').Role;

module.exports = {

    getSideNavList: (req, res) => {
        try {
            
            res.status(200).json(req.principal);

        }
        catch(error) {
            console.log(error);
            res.status(500).json(error);
        }
    }
}