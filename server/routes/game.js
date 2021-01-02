/**
 * @author khanhhongtranle
 * @type {e | (() => Express)}
 */
const express = require('express');
var passport = require('passport');
require('../passport/passport')(passport);
const { } = require('../controllers/game');
const gameRoutes = express.Router();

//gameRoutes.get('/', passport.authenticate('jwt', { session: false }));

module.exports = gameRoutes;
