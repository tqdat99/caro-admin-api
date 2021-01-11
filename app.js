// import dependencies
// import express from 'express';
// import bodyParser from 'body-parser';
// import mongoose from 'mongoose';
// import logger from 'morgan';
// import userRoutes from './server/routes/user.js';
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const userRoutes = require('./server/routes/user');
const adminRoutes = require('./server/routes/admin');
const gameRoutes = require('./server/routes/game');
const passport = require('passport');

require('./server/db/db');

// set up dependencies
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(passport.initialize());

app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', '*');
  next();
});

// set up routes
app.use('/users/', userRoutes);
app.use('/admins/', adminRoutes);
app.use('/games/', gameRoutes);

// set up port
const port = process.env.PORT || 5035;
// set up route
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to Project with Nodejs Express and MongoDB',
  });
});


const server = require('http').createServer(app);

server.listen(port, () => {
  console.log(`Our server is running on port ${port}`);
});


module.exports.app = app;
