var passport = require('passport');
require('../passport/passport')(passport);
const User = require('../models/user');
jwt_secret_or_key = 'WEBNC17' || process.env.JWT_SECRET_OR_KEY;

// Get users
module.exports.getUsers = function (req, res) {
  return User.find()
    .select('username')
    .then((Users) => {
      return res.status(200).json({
        success: true,
        message: 'Users',
        Users: Users,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: 'Server error. Please try again.',
        error: err.message,
      });
    });
}

// Check user by username
module.exports.getUserByUsername = function (req, res) {
  return User.find({ "username": req.query.username })
    .select('username')
    .then((User) => {
      return res.status(200).json({
        success: true,
        message: 'User',
        User: User,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: 'Server error. Please try again.',
        error: err.message,
      });
    });
}
