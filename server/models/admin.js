const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
var Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const adminSchema = new Schema({
  _id: Schema.Types.ObjectId,
  adminId: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  root: {
    type: Boolean,
    required: true,
  }
});

adminSchema.pre('save', function (next) {
  var admin = this;
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(admin.password, salt, function (err, hash) {
        if (err) {
          return next(err);
        }
        admin.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

adminSchema.methods.comparePassword = function (passw, cb) {
  bcrypt.compare(passw, this.password, function (err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};


module.exports = mongoose.model('Admin', adminSchema);