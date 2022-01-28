const { User } = require('../models/UserModel');

const userController = {};


userController.getCurrent = (req, res, next) => {
    const currentUserId = req.user.id;

    User.findOne({ userId: currentUserId }, (err, currentUser) => {
    if (err) {
      return next(err); 
    }
    res.locals.users = currentUser;
    // console.log(currentUser);
    return next(); 
    });
}


userController.modCurrent = (req, res, next) => {
    return next();
}



module.exports = userController;