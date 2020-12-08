const express = require('express');
var passport = require('passport');
require('../passport/passport')(passport);
const { getAdmins, getAdminByAdminId, signUp, signIn } = require('../controllers/admin');
const adminRoutes = express.Router();

adminRoutes.get('/', passport.authenticate('jwt', { session: false }), getAdmins);
adminRoutes.post('/signup', passport.authenticate('jwt', { session: false }), signUp);
adminRoutes.post('/signin', signIn);
adminRoutes.get('/admin', passport.authenticate('jwt', { session: false }), getAdminByAdminId);

module.exports = adminRoutes;