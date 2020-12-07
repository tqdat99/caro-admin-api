const mongoose = require('mongoose');
const Admin = require('../models/admin');

// Get admins
module.exports.getAdmins = function (req, res) {
    return Admin.find()
        .select('adminId')
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

// Check admin by adminId
module.exports.checkAdminByAdminId = function (req, res) {
    return Admin.find({ "adminId": req.query.adminId })
        .select('admin')
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

// Get admin by adminId
module.exports.getAdminByAdminId = function (req, res) {
    return Admin.find({ "adminId": req.query.adminId })
        .select('adminId')
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

// Get password by adminId
module.exports.getPasswordByAdminId = function (req, res) {
    return Admin.find({ "adminId": req.query.adminId })
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

// Create admin
module.exports.createAdmin = function (req, res) {
    const admin = new Admin({
        _id: mongoose.Types.ObjectId(),
        adminId: req.body.adminId,
        password: req.body.password,
    });

    return admin
        .save()
        .then((newAdmin) => {
            return res.status(201).json({
                success: true,
                message: 'Admin created successfully',
                Admin: newAdmin,
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