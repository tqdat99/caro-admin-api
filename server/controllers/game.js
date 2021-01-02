/**
 * @author khanhhongtranle
 * @type {Authenticator}
 */
var passport = require('passport');
require('../passport/passport')(passport);
const Game = require('../models/game');
jwt_secret_or_key = 'WEBNC17' || process.env.JWT_SECRET_OR_KEY;
var mongoose = require('mongoose');

module.exports.getAllOfGames = async function (req, res) {
    return Game.find()
        .select(' ')
        .then((Games) => {
            return res.status(200).json({
                success: true,
                message: 'Games',
                Games: Games,
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

module.exports.getGameByID = async function (req, res) {
    return Game.find({"_id": req.query.id})
        .select(' ')
        .then((Game) => {
            return res.status(200).json({
                success: true,
                message: 'Game',
                Game: Game,
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
