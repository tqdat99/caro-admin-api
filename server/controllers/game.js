/**
 * @author khanhhongtranle
 * @type {Authenticator}
 */
var passport = require('passport');
require('../passport/passport')(passport);
const Game = require('../models/game');
jwt_secret_or_key = 'WEBNC17' || process.env.JWT_SECRET_OR_KEY;
var mongoose = require('mongoose');
