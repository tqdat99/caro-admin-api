/**
 * @author khanhhongtranle
 * @type {e | (() => Express)}
 */
const express = require('express');
var passport = require('passport');
require('../passport/passport')(passport);
const { getAllOfGames } = require('../controllers/game');
const gameRoutes = express.Router();

gameRoutes.get('/all', passport.authenticate('jwt', { session: false }), getAllOfGames);

module.exports = gameRoutes;
