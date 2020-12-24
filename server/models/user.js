const mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const userSchema = new Schema({
    _id: Schema.Types.ObjectId,
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
    },
    email: {
        type: String,
    },
    active: {
        type: String,
    }
});

module.exports = mongoose.model('User', userSchema);
