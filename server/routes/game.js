/**
 * @author khanhhongtranle
 * @type {e | (() => Express)}
 */
const express = require('express');
var passport = require('passport');
require('../passport/passport')(passport);
const { getAllOfGames, getGameByID, getGameByUsername } = require('../controllers/game');
const gameRoutes = express.Router();

gameRoutes.get('/all', passport.authenticate('jwt', { session: false }), getAllOfGames);
gameRoutes.get('/id', passport.authenticate('jwt', { session: false }), getGameByID);
gameRoutes.get('/byusername', passport.authenticate('jwt', { session: false }), getGameByUsername);

module.exports = gameRoutes;
