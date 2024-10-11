const mongoose = require("mongoose")

//Define the use Schema

const userSchema = new mongoose.Schema({
    userName: {type:String, required: true, unique: true},
    email: {type:String, required: true, uniqe:true},
    session: [{
        language: String,
        timeStamp: Number,
        date: {type: Date, default: Date.now}
    }]
});

const User = mongoose.model('User', userSchema)

module.exports = User