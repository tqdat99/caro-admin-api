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
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// set up routes
app.use('/users/', userRoutes);
app.use('/admins/', adminRoutes);

// set up port
const port = process.env.PORT || 5035;
// set up route
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to Project with Nodejs Express and MongoDB',
  });
});


const server = require('http').createServer(app);
const io = require('socket.io')(server);
const userSocketIdMap = new Map();

io.on('connection', function (socket) {
  console.log("socket.id:", socket.id);
  let userName = socket.handshake.query.userName;
  if (!userSocketIdMap.has(userName)) {
    userSocketIdMap.set(userName, new Set([socket.id]));
  } else {
    userSocketIdMap.get(userName).add(socket.id);
  }
  let onlineUsers = Array.from(userSocketIdMap.keys());
  console.log(onlineUsers);
  io.emit('Online-users', { Online: onlineUsers });
  /* Disconnect socket */
  socket.on('disconnect', function () {
    if (userSocketIdMap.has(userName)) {
      let userSocketIdSet = userSocketIdMap.get(userName);
      userSocketIdSet.delete(socket.id);
      if (userSocketIdSet.size == 0) {
        userSocketIdMap.delete(userName);
      }
      let onlineUsers = Array.from(userSocketIdMap.keys());
      console.log(onlineUsers);
      io.emit('Online-users', { Online: onlineUsers });
    }
  });
});


server.listen(port, () => {
  console.log(`Our server is running on port ${port}`);
});


module.exports.app = app;
