const mongoose = require('mongoose');
var passport = require('passport');
require('../passport/passport')(passport);
var jwt = require('jsonwebtoken');
jwt_secret_or_key = 'WEBNC17' || process.env.JWT_SECRET_OR_KEY;

const Admin = require('../models/admin');

// Get admins
module.exports.getAdmins = function (req, res) {
    return Admin.find()
        .select('adminId root')
        .then((Admins) => {
            return res.status(200).json({
                success: true,
                message: 'Admins',
                Admins: Admins,
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

module.exports.signUp = async function (req, res) {
    if (!req.body.adminId || !req.body.password) {
        res.json({ success: false, msg: 'Please pass adminId and password.' });
    } else {
        const user = new Admin({
            _id: mongoose.Types.ObjectId(),
            adminId: req.body.adminId,
            password: req.body.password,
            root: false,
        });
        if (await checkAdminId(user.adminId)) {
            return res.status(201).json({
                success: false,
                message: 'AdminId already existed.',
            });
        }
        return user
            .save()
            .then((newAdmin) => {
                return res.status(201).json({
                    success: true,
                    message: 'Admin created successfully',
                });
            })
            .catch((error) => {
                res.status(500).json({
                    success: false,
                    message: 'Server error. Please try again.',
                    error: error.message,
                });
            });
    };
};

// Get user by adminId
checkAdminId = function (adminId) {
    return Admin.find({ "adminId": adminId })
        .select('adminId')
        .then((Admin) => {
            if (Admin.length > 0) {
                return true;
            }
            return false;
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: 'Server error. Please try again.',
                error: err.message,
            });
        });
}

module.exports.signIn = function (req, res) {
    Admin.findOne({
        adminId: req.body.adminId
    }, function (err, admin) {
        if (err) throw err;
        if (!admin) {
            res.status(401).send({ success: false, msg: 'Authentication failed. Admin not found.' });
        } else {
            // check if password matches
            admin.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    // if admin is found and password is right create a token
                    var token = jwt.sign(admin.toJSON(), jwt_secret_or_key);
                    // return the information including token as JSON
                    res.json({ success: true, token: 'JWT ' + token });
                } else {
                    res.status(401).send({ success: false, msg: 'Authentication failed. Wrong password.' });
                }
            });
        }
    }).catch((err) => {
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again.',
            error: err.message,
        });
    });
};

getToken = function (headers) {
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};

// Get admin by adminId
module.exports.getAdminByAdminId = function (req, res) {
    return Admin.find({ "adminId": req.query.adminId })
        .select('adminId root')
        .then((Admin) => {
            return res.status(200).json({
                success: true,
                message: 'Admin',
                Admin: Admin,
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
