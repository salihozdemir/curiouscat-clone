const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String, 
        required: true, 
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: {type: String, required: true},
    username: {type: String, required: true, unique:true},
    profileImg: {type: String, default: 'default-pp.png'},
    answerCount: {type: Number, default: 0}
});

module.exports = mongoose.model('User', userSchema);