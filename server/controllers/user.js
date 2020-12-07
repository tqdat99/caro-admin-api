import mongoose from 'mongoose';
import User from '../models/user.js';

// Create user
export function createUser (req, res) {
    const user = new User({
      _id: mongoose.Types.ObjectId(),
      username: req.body.username,
    });
    
    return user
      .save()
      .then((newUser) => {
        return res.status(201).json({
          success: true,
          message: 'User created successfully',
          User: newUser,
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