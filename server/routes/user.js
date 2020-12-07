const express = require('express');
const { createUser, getUsers, getUserByUsername, getPasswordByUsername, checkUserByUsername } = require('../controllers/user');
const userRoutes = express.Router();

userRoutes.post('/create', createUser);
userRoutes.get('/', getUsers);
userRoutes.get('/user', getUserByUsername);
userRoutes.get('/password', getPasswordByUsername);
userRoutes.get('/check', checkUserByUsername);

module.exports = userRoutes;