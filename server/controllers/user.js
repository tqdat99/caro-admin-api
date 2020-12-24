var passport = require('passport');
require('../passport/passport')(passport);
const User = require('../models/user');
jwt_secret_or_key = 'WEBNC17' || process.env.JWT_SECRET_OR_KEY;
var mongoose = require('mongoose');

// Get users
module.exports.getUsers = function (req, res) {
    return User.find()
        .select('username email active')
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
    return User.find({"username": req.query.username})
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

/**
 * khanhhongtranle
 */
// Search user(s) by username or email address
module.exports.searchUsers = function (req, res) {
    let keyword = req.query.kw;
    return User.find({$or: [{username: {$regex: keyword}}, {email: {$regex: keyword}}]})
        .select('username email')
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

/**
 * khanhhongtranle
 */
//Get user infomation by user id
module.exports.getUserByUserID = function (req, res) {
    let id = req.query.id;
    return User.find({_id: id})
        .select('username email')
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

/**
 * khanhhongtranle
 */
//Update active status
module.exports.postUpdateActiveStatus = async function (req, res) {
    const data = req.body;
    console.log(data);
    let activeStatus;
    if (data.block) {
        activeStatus = "0";
    } else {
        activeStatus = "1";
    }

    return User.updateOne(
        { "_id": data.id },
        {
            $set:
                {
                    active: activeStatus
                }

        }
    ).exec()
        .then(User.find().select('')
            .then((User) => {
                return res.status(200).json({
                    success: true,
                    message: 'User',
                    User: User,
                });
            })
            .catch((err) => {
                return res.status(500).json({
                    success: false,
                    message: 'Server error. Please try again.',
                    error: err.message,
                });
            }))
        .catch((err)=>{
            return res.status(500).json({
                success: false,
                message: 'Server error. Please try again.',
                error: err.message,
            });
            }
        );

}
