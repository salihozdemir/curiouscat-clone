const mongoose = require('mongoose');

const notificationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    toUser: {type: mongoose.Schema.Types.ObjectId, ref:'User', required: true},
    fromUser: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    timeStamp: {type: Date, default: Date.now},
    notificationText: {type: String, required: true}
});

module.exports = mongoose.model('Notification', notificationSchema);