const express = require('express');
const { getUsers, getUserByUsername } = require('../controllers/user');
const userRoutes = express.Router();
var passport = require('passport');
require('../passport/passport')(passport);

userRoutes.get('/', passport.authenticate('jwt', { session: false }), getUsers);
userRoutes.get('/user', passport.authenticate('jwt', { session: false }), getUserByUsername);

module.exports = userRoutes;