const express = require('express');
const {
    getUsers,
    getUserByUsername,
    searchUsers,
    getUserByUserID,
    postUpdateActiveStatus
} = require('../controllers/user');
const userRoutes = express.Router();
var passport = require('passport');
const {postSaveUser} = require("../controllers/user");
require('../passport/passport')(passport);

userRoutes.get('/', passport.authenticate('jwt', {session: false}), getUsers);
userRoutes.get('/user', passport.authenticate('jwt', {session: false}), getUserByUsername);
userRoutes.get('/search', passport.authenticate('jwt', {session: false}), searchUsers);
userRoutes.get('/userbyid', passport.authenticate('jwt', {session: false}), getUserByUserID);
userRoutes.post('/updateactive', passport.authenticate('jwt', {session: false}), postUpdateActiveStatus);
userRoutes.post('/updateuser', passport.authenticate('jwt', {session: false}), postSaveUser);

module.exports = userRoutes;
