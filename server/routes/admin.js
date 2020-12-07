const express = require('express');
const { createAdmin, getAdmins, getAdminByAdminId, getPasswordByAdminId, checkAdminByAdminId } = require('../controllers/admin');
const adminRoutes = express.Router();

adminRoutes.post('/create', createAdmin);
adminRoutes.get('/', getAdmins);
adminRoutes.get('/admin', getAdminByAdminId);
adminRoutes.get('/password', getPasswordByAdminId);
adminRoutes.get('/check', checkAdminByAdminId);

module.exports = adminRoutes;