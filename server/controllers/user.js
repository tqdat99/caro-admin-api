const mongoose = require('mongoose');
const User = require('../models/user');

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
module.exports.checkUserByUsername = function (req, res) {
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

// Get user by username
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

// Get password by username
module.exports.getPasswordByUsername = function (req, res) {
  return User.find({ "username": req.query.username })
    .select('password')
    .then((Password) => {
      return res.status(200).json({
        success: true,
        message: 'Password',
        Password: Password,
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

// Create user
module.exports.createUser = function (req, res) {
  const user = new User({
    _id: mongoose.Types.ObjectId(),
    username: req.body.username,
    password: req.body.password,
  });

  return user
    .save()
    .then((newUser) => {
      return res.status(201).json({
        success: true,
        message: 'User created successfully',
        User: newUser,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        success: false,
        message: 'Server error. Please try again.',
        error: error.message,
      });
    });
}