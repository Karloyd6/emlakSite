const mongoose = require("mongoose");

const {Schema} = mongoose;

const userSchema = new Schema({
    name: String,
    username : String,
    email : String,
    password: String,
    phoneNumber : String,
    profile_image : String
},{timestamps : true, versionKey : false});

module.exports = mongoose.model("userSchema",userSchema)