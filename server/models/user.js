const mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const userSchema = new Schema({
    _id: Schema.Types.ObjectId,
    username: {
        type: String,
        required: true,
    },
    displayName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
    },
    email: {
        type: String,
    },
    avatar: {
        type: String,
        default: 'https://img.freepik.com/free-vector/pro-player-esport-game-logo_139366-231.jpg?size=626&ext=jpg',
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    active: {
        type: String,
        required: true,
        default: '1',
    },
    verified: {
        type: Boolean,
        default: false,
    },
    game_ids: [{
        type: Schema.Types.ObjectId,
        ref: 'Game'
    }],
    wins: {
        type: Number,
        required: true,
        default: 0,
    },
    cups: {
        type: Number,
        required: true,
        default: 0,
    },
    level: {
        type: String,
        required: true,
        default: 'bronze',
    }
});

module.exports = mongoose.model('User', userSchema);
