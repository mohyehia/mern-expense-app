const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true,
        match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    },
    password: {type: String, required: true},
    joined: {type: Date, default: new Date()}
});

module.exports = mongoose.model('User', userSchema);