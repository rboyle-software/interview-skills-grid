const { User } = require('../models/UserModel');

const userController = {};


userController.getUserSkills = (req, res, next) => {
    const currentUserId = req.user.userId;

    User.findOne({ userId: currentUserId }, (err, foundUser) => {
        if (err) {
          return next(err);
        }

        res.locals.user = foundUser;
        return next();
    });
}


userController.updateUserSkills = (req, res, next) => {

    const index = req.body.index;
    const updateId = res.req.user.userId;
    const updateObject = {
        status: req.body.status,
        value: req.body.value
    };

    User.updateOne( { userId: updateId }, { "boardContent.index": updateObject } );

    return next();
}


module.exports = userController;