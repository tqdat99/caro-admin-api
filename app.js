// import dependencies
// import express from 'express';
// import bodyParser from 'body-parser';
// import mongoose from 'mongoose';
// import logger from 'morgan';
// import userRoutes from './server/routes/user.js';
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const logger = require('morgan');
const userRoutes = require('./server/routes/user');

// set up dependencies
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));

// set up routes
app.use('/users/', userRoutes);


// set up mongoose
const mongo_path = process.env.MONGO_PATH;
mongoose.connect(mongo_path || "mongodb+srv://tqdat99:datdarkus1305@tqdat99.imlem.mongodb.net/caro?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Database connected');
  })
  .catch((error) => {
    console.log('Error connecting to database');
  });

// set up port
const port = process.env.PORT;
// set up route
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to Project with Nodejs Express and MongoDB',
  });
});
app.listen(port, () => {
  console.log(`Our server is running on port ${port}`);
});


module.exports.app = app;