const mongoose = require('mongoose');

const followSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    toUser: {type: mongoose.Schema.Types.ObjectId, ref:'User', required: true},
    fromUser: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    timeStamp: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Follow', followSchema);