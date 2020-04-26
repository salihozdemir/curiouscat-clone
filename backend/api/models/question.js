const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    toUser: {type: mongoose.Schema.Types.ObjectId, ref:'User', required: true},
    fromUser: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    isAnon: {type: Boolean, required: true},
    questionText : {type: String, required: true},
    answerText: {type: String},
    timeStamp: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Question', questionSchema);