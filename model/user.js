const mongoose = require('mongoose')
const userschema = new mongoose.Schema({
     name: {
        type: String,
        required: [true, 'please enter your name']
    },
    email: {
        type: String,
        required: [true, 'please enter your Email'],
        unique: [true,"email already exits,please diffrentOne"]
    },
    password: {
        type: String,
        required: [true, 'please enter your password']
    },
    role: {
        type: String,
        enum: ['subAdmin', 'superAdmin','user'],
        default: 'user'
    }
})
module.exports = mongoose.model('user',userschema)